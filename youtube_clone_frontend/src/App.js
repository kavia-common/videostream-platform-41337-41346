import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./theme/tokens.css";
import { ThemeProvider } from "./theme";
import AppShell from "./layout/AppShell";
import AppRoutes from "./routes/AppRoutes";

/**
 * PUBLIC_INTERFACE
 * App is the root component that sets up theming and routing and renders the AppShell.
 */
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </BrowserRouter>
    </ThemeProvider>
  );
}
