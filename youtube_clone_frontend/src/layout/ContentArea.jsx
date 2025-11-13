import React from "react";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * ContentArea acts as the scrollable main content column with proper paddings.
 */
export default function ContentArea({ children }) {
  return (
    <main className="content" role="main">
      {children}
    </main>
  );
}
