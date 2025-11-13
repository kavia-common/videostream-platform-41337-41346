import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderAppBar from "./HeaderAppBar";
import SidebarNav from "./SidebarNav";
import ContentArea from "./ContentArea";
import "../App.css";
import { useSearchActions, useSearchState } from "../state/searchSlice";
import { useQueryParam } from "../hooks/useQueryParam";

/**
 * PUBLIC_INTERFACE
 * AppShell renders the application chrome: header, sidebar, and content slot.
 */
export default function AppShell({ children }) {
  const { query } = useSearchState();
  const { setQuery } = useSearchActions();
  const [, setQp] = useQueryParam("q", "");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = (query || "").trim();
    if (q) {
      setQp(q);
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
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
