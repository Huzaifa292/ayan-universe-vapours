"use client";

import React from "react";

import { ShoppingBag, Flame, Zap, Wind } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price?: number;
  flavor: string;
  color: string;
  puffs: string;
  battery: string;
  capacity: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onHover: (color: string) => void;
  onClick: (product: Product) => void;
  onCheckout?: (product: Product) => void;
}

function getTextColor(hexColor: string): string {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#000000" : "#ffffff";
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onHover, onClick, onCheckout }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [glare, setGlare] = React.useState({ x: 50, y: 50, active: false, rotX: 0, rotY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 14;
    const rotateY = ((x - centerX) / centerX) * -14;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setGlare({ x: glareX, y: glareY, active: true, rotX: rotateX, rotY: rotateY });
  };

  const handleMouseLeave = () => {
    setGlare({ x: 50, y: 50, active: false, rotX: 0, rotY: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="product-card"
      onMouseEnter={() => onHover(product.color)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(product)}
      style={{
        "--product-color": product.color,
        cursor: "pointer",
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: glare.active
          ? `perspective(1000px) rotateX(${glare.rotX}deg) rotateY(${glare.rotY}deg) scale3d(1.04, 1.04, 1.04) translateZ(15px)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: glare.active ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: glare.active
          ? `0 25px 50px rgba(0,0,0,0.85), 0 0 35px ${product.color}40`
          : undefined,
        position: "relative",
        overflow: "hidden"
      } as React.CSSProperties}
    >
      {/* Holographic 3D Surface Sheen */}
      {glare.active && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.22) 0%, rgba(168,85,247,0.12) 40%, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 15,
            mixBlendMode: "screen",
            borderRadius: "inherit"
          }}
        />
      )}

      {/* Dynamic Glow Background */}
      <div className="product-glow-bg" style={{ backgroundColor: product.color }} />

      {/* Product Spec Badges */}
      <div className="product-badges" style={{ transform: glare.active ? "translateZ(30px)" : "translateZ(0)", transition: "transform 0.15s ease" }}>
        <span className="badge">
          <Zap size={10} />
          {product.puffs}
        </span>
        <span className="badge">
          <Flame size={10} />
          {product.capacity}
        </span>
      </div>

      {/* Pod Image or Stylized Vector Graphic with 3D Pop-Out */}
      <div className="product-graphic-wrapper" style={{ transformStyle: "preserve-3d" }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: glare.active ? "translateZ(45px) scale(1.08)" : "translateZ(0px) scale(1)",
              filter: glare.active ? "drop-shadow(0 20px 25px rgba(0,0,0,0.75))" : "drop-shadow(0 10px 15px rgba(0,0,0,0.5))",
              transition: "transform 0.15s ease-out, filter 0.15s ease-out"
            }}
          />
        ) : product.id.startsWith("coil-") ? (
          <div className="product-coil-vector" style={{ transform: glare.active ? "translateZ(40px)" : "none", transition: "transform 0.15s ease" }}>
            <div className="coil-fins" />
            <div className="coil-cylinder" style={{ borderLeft: `2px solid ${product.color}` }}>
              <div className="coil-mesh-core" style={{ boxShadow: `0 0 10px ${product.color}` }} />
              <span className="coil-label">MESH</span>
            </div>
            <div className="coil-pin" />
          </div>
        ) : product.id.startsWith("accessory-") ? (
          <div className="product-accessory-vector" style={{ transform: glare.active ? "translateZ(40px)" : "none", transition: "transform 0.15s ease" }}>
            <div className="accessory-case" style={{ borderColor: product.color }}>
              <div className="accessory-brand">AYAN</div>
            </div>
            <div className="accessory-lanyard" style={{ background: `linear-gradient(to bottom, ${product.color}, #1e293b)` }} />
          </div>
        ) : (
          <div className="product-device-vector" style={{ transform: glare.active ? "translateZ(40px)" : "none", transition: "transform 0.15s ease" }}>
            <div className="vector-cap" />
            <div className="vector-tank" />
            <div className="vector-body" style={{ background: `linear-gradient(135deg, ${product.color}, #1f2937)` }}>
              <span className="vector-brand">VPR</span>
            </div>
            <div className="vector-led-glow animate-pulse" style={{ backgroundColor: product.color }} />
          </div>
        )}
      </div>

      {/* Product Text info */}
      <div className="product-info" style={{ transform: glare.active ? "translateZ(25px)" : "translateZ(0)", transition: "transform 0.15s ease" }}>
        <span className="product-flavor-pill" style={{ color: product.color, border: `1px solid ${product.color}40`, backgroundColor: `${product.color}10` }}>
          {product.flavor}
        </span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price" style={{ margin: "6px 0", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.2px", color: "#c084fc", background: "rgba(168, 85, 247, 0.18)", padding: "3px 10px", borderRadius: "8px", border: "1px solid rgba(168, 85, 247, 0.35)" }}>
            BEST PRICE
          </span>
        </div>

        {/* Dynamic technical properties */}
        <div className="product-specs-list">
          <div className="spec-item">
            <Wind size={12} />
            <span>Dual Airflow</span>
          </div>
          <div className="spec-item">
            <Zap size={12} />
            <span>{product.battery} Battery</span>
          </div>
        </div>

        {/* Footer row: Details & WhatsApp Checkout buttons */}
        <div className="product-footer" style={{ display: "flex", gap: "10px", width: "100%", marginTop: "12px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
            className="btn btn-secondary"
            style={{
              flex: 1,
              borderRadius: "12px",
              cursor: "pointer",
              padding: "10px 0",
              fontSize: "13px",
              fontWeight: "700",
              border: "1px solid var(--border-glass)",
              background: "var(--bg-glass)",
              color: "var(--foreground)"
            }}
          >
            Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onCheckout) {
                onCheckout(product);
              }
            }}
            className="btn btn-bubble-hover"
            style={{
              "--btn-bg-color": product.color,
              "--btn-text-color": getTextColor(product.color),
              flex: 1.5,
              borderRadius: "12px",
              border: `1px solid ${product.color}`,
              cursor: "pointer",
              padding: "10px 0",
              fontSize: "13px"
            } as React.CSSProperties}
          >
            <span className="bubble-effect" />
            <span className="btn-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <ShoppingBag size={14} />
              <span>Buy Now</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
