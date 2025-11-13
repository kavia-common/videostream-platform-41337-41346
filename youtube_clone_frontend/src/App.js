import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./theme/tokens.css";
import { ThemeProvider } from "./theme";
import AppShell from "./layout/AppShell";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./state/store";
import { UserProvider } from "./state/userContext";
import { getFeatureFlags } from "./utils/featureFlags";

/**
 * PUBLIC_INTERFACE
 * App is the root component that sets up theming and routing and renders the AppShell.
 */
export default function App() {
  const flags = getFeatureFlags();

  return (
    <ThemeProvider defaultTheme="dark">
      <AppProvider preloadedState={{ flags: { byKey: flags } }}>
        <UserProvider>
          <BrowserRouter>
            <AppShell>
              <AppRoutes />
            </AppShell>
          </BrowserRouter>
        </UserProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
