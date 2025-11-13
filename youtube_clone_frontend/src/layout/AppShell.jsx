import React, { useState } from "react";
import HeaderAppBar from "./HeaderAppBar";
import SidebarNav from "./SidebarNav";
import ContentArea from "./ContentArea";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * AppShell renders the application chrome: header, sidebar, and content slot.
 */
export default function AppShell({ children }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // In later steps, this can navigate to /search?q=...
    // Placeholder: no-op.
  };

  return (
    <div className="app-root">
      <HeaderAppBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />
      <div className="app-body">
        <SidebarNav />
        <ContentArea>{children}</ContentArea>
      </div>
    </div>
  );
}
