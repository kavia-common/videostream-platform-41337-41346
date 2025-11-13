import React, { createContext, useContext, useMemo } from "react";
import { useAppDispatch, useAppState, actions } from "./store";

// PUBLIC_INTERFACE
export const UserContext = createContext({
  user: { id: null, name: null, avatarUrl: null, isAuthenticated: false },
  signIn: () => {},
  signOut: () => {},
  updateUser: () => {},
});

// PUBLIC_INTERFACE
export function UserProvider({ children }) {
  /**
   * Thin provider that maps global store user state to a context API for convenience.
   */
  const { user } = useAppState();
  const dispatch = useAppDispatch();

  const value = useMemo(
    () => ({
      user,
      signIn: (u) => dispatch(actions.signIn(u)),
      signOut: () => dispatch(actions.signOut()),
      updateUser: (patch) => dispatch(actions.updateUser(patch)),
    }),
    [user, dispatch]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// PUBLIC_INTERFACE
export function useUser() {
  /** Returns { user, signIn, signOut, updateUser } */
  return useContext(UserContext);
}
