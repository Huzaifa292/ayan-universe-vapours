import { Wind, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#050508",
        color: "#fff",
        textAlign: "center",
        padding: "24px",
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Aurora glow effect behind */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.1,
          background: "#00f0ff",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div style={{ zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <Wind size={48} style={{ color: "#00f0ff", animation: "float 4s ease-in-out infinite" }} />
        
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "900",
            margin: "0",
            background: "linear-gradient(90deg, #fff, #00f0ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>
        
        <h2 style={{ fontSize: "24px", fontWeight: "700", margin: "0" }}>Flavor Not Found</h2>
        
        <p style={{ color: "#9ca3af", maxWidth: "360px", fontSize: "14px", lineHeight: "1.6", margin: "0 0 10px 0" }}>
          The page you are looking for has evaporated into thin air or doesn't exist.
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#00f0ff",
            color: "#000",
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: "12px",
            letterSpacing: "0.5px",
            textDecoration: "none",
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
            transition: "all 0.3s ease",
          }}
        >
          <Home size={16} />
          Go Back Home
        </a>
      </div>
    </div>
  );
}
