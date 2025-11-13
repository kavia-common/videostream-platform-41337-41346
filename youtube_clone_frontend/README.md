# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify
- **State Management**: Minimal global store with React Context + useReducer (no external libs)
- **Feature Flags**: Read from `REACT_APP_FEATURE_FLAGS` env var

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Global Store

- Store: `src/state/store.js` exposes:
  - `AppProvider`, `useAppState`, `useAppDispatch`, and `actions`.
- Search slice helpers: `src/state/searchSlice.js` provides:
  - `useSearchState()` and `useSearchActions()` (with `performSearch` mock).
- User convenience context: `src/state/userContext.js` provides:
  - `useUser()` for `{ user, signIn, signOut, updateUser }`.

Wrap is already integrated in `src/App.js`.

## Query Param Hook

- `src/hooks/useQueryParam.js` offers `[value, setValue]` for a given key using `history.replaceState`.  
  Example:
  ```js
  const [q, setQ] = useQueryParam("q", "");
  ```

## Feature Flags

- `src/utils/featureFlags.js` parses `REACT_APP_FEATURE_FLAGS`.
- Supported formats:
  - JSON: `{"newSearch":true}`
  - CSV: `newSearch, cool=true, beta=false`
  - Semicolon: `a=true;b=false`
- In code:
  ```js
  import { isFeatureEnabled } from "./utils/featureFlags";
  if (isFeatureEnabled("newSearch")) { /* ... */ }
  ```

### Env Variables
Ensure these are available in `.env` (do not commit secrets):
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

## Customization

### Colors

Main styles live in `src/theme/tokens.css` and page/component-level styles in `src/App.css`.

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting
Moved: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size
Moved: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### PWA
Moved: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration
Moved: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment
Moved: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify
Moved: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
