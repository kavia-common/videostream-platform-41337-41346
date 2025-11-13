//
// Lightweight global store using React Context and useReducer.
// No external dependencies. Provides AppProvider and hooks for state/actions.
//
import React, { createContext, useContext, useMemo, useReducer } from "react";

// Root state shape and initial values
const initialState = {
  search: {
    query: "",
    results: [],
    isLoading: false,
    error: null,
  },
  user: {
    id: null,
    name: null,
    avatarUrl: null,
    isAuthenticated: false,
  },
  flags: {
    // feature flags parsed from environment (see utils/featureFlags)
    byKey: {},
  },
};

// Action types
const TYPES = {
  SEARCH_SET_QUERY: "SEARCH_SET_QUERY",
  SEARCH_SET_RESULTS: "SEARCH_SET_RESULTS",
  SEARCH_SET_LOADING: "SEARCH_SET_LOADING",
  SEARCH_SET_ERROR: "SEARCH_SET_ERROR",
  USER_SIGN_IN: "USER_SIGN_IN",
  USER_SIGN_OUT: "USER_SIGN_OUT",
  USER_UPDATE: "USER_UPDATE",
  FLAGS_SET_ALL: "FLAGS_SET_ALL",
};

// Reducer to manage root state
function reducer(state, action) {
  switch (action.type) {
    case TYPES.SEARCH_SET_QUERY:
      return { ...state, search: { ...state.search, query: action.payload } };
    case TYPES.SEARCH_SET_RESULTS:
      return { ...state, search: { ...state.search, results: action.payload } };
    case TYPES.SEARCH_SET_LOADING:
      return { ...state, search: { ...state.search, isLoading: !!action.payload } };
    case TYPES.SEARCH_SET_ERROR:
      return { ...state, search: { ...state.search, error: action.payload } };

    case TYPES.USER_SIGN_IN:
      return {
        ...state,
        user: { ...state.user, ...action.payload, isAuthenticated: true },
      };
    case TYPES.USER_SIGN_OUT:
      return { ...state, user: { ...initialState.user } };
    case TYPES.USER_UPDATE:
      return { ...state, user: { ...state.user, ...action.payload } };

    case TYPES.FLAGS_SET_ALL:
      return { ...state, flags: { ...state.flags, byKey: action.payload || {} } };

    default:
      return state;
  }
}

// Contexts
const AppStateContext = createContext(initialState);
const AppDispatchContext = createContext(() => {});

// PUBLIC_INTERFACE
export function AppProvider({ children, preloadedState, onDispatch }) {
  /**
   * AppProvider wraps the application with a minimal global store using useReducer.
   * preloadedState: optional object to seed initial state
   * onDispatch: optional function to observe dispatched actions (for logging/debugging)
   */
  const [state, dispatchBase] = useReducer(reducer, { ...initialState, ...preloadedState });

  const dispatch = (action) => {
    if (typeof onDispatch === "function") {
      try {
        onDispatch(action);
      } catch (_) {
        // swallow observer errors to not break app
      }
    }
    dispatchBase(action);
  };

  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, [dispatch]);

  return (
    <AppStateContext.Provider value={stateValue}>
      <AppDispatchContext.Provider value={dispatchValue}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAppState() {
  /** Returns the entire app state object. */
  return useContext(AppStateContext);
}

// PUBLIC_INTERFACE
export function useAppDispatch() {
  /** Returns the dispatch function to update state. */
  return useContext(AppDispatchContext);
}

// PUBLIC_INTERFACE
export const actions = {
  /** Action creator helpers for ergonomics. */
  setSearchQuery: (q) => ({ type: TYPES.SEARCH_SET_QUERY, payload: q }),
  setSearchResults: (items) => ({ type: TYPES.SEARCH_SET_RESULTS, payload: items }),
  setSearchLoading: (flag) => ({ type: TYPES.SEARCH_SET_LOADING, payload: flag }),
  setSearchError: (err) => ({ type: TYPES.SEARCH_SET_ERROR, payload: err }),
  signIn: (user) => ({ type: TYPES.USER_SIGN_IN, payload: user }),
  signOut: () => ({ type: TYPES.USER_SIGN_OUT }),
  updateUser: (patch) => ({ type: TYPES.USER_UPDATE, payload: patch }),
  setAllFlags: (flagsObj) => ({ type: TYPES.FLAGS_SET_ALL, payload: flagsObj }),
};

export { TYPES };
