"use client";

import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#050508",
          color: "#fff",
          textAlign: "center",
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: "24px",
          margin: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <AlertTriangle size={56} style={{ color: "#ef4444" }} />
          
          <h1 style={{ fontSize: "32px", fontWeight: "800", margin: 0 }}>System Anomaly Detected</h1>
          
          <p style={{ color: "#9ca3af", maxWidth: "420px", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
            An unexpected runtime interruption occurred. Let's try to reload the system state.
          </p>

          <button
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "8px",
              backgroundColor: "#ef4444",
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: "700",
              fontSize: "12px",
              letterSpacing: "0.5px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            <RotateCcw size={16} />
            Reset State
          </button>
        </div>
      </body>
    </html>
  );
}
