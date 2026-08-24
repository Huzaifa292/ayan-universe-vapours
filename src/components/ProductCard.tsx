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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rotation values: max tilt of 12 degrees
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * -12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
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
        backfaceVisibility: "hidden"
      } as React.CSSProperties}
    >
      {/* Dynamic Glow Background */}
      <div className="product-glow-bg" style={{ backgroundColor: product.color }} />

      {/* Product Spec Badges */}
      <div className="product-badges">
        <span className="badge">
          <Zap size={10} />
          {product.puffs}
        </span>
        <span className="badge">
          <Flame size={10} />
          {product.capacity}
        </span>
      </div>

      {/* Pod Image or Stylized Vector Graphic */}
      <div className="product-graphic-wrapper">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.5))" }}
          />
        ) : product.id.startsWith("coil-") ? (
          <div className="product-coil-vector">
            <div className="coil-fins" />
            <div className="coil-cylinder" style={{ borderLeft: `2px solid ${product.color}` }}>
              <div className="coil-mesh-core" style={{ boxShadow: `0 0 10px ${product.color}` }} />
              <span className="coil-label">MESH</span>
            </div>
            <div className="coil-pin" />
          </div>
        ) : product.id.startsWith("accessory-") ? (
          <div className="product-accessory-vector">
            <div className="accessory-case" style={{ borderColor: product.color }}>
              <div className="accessory-brand">AYAN</div>
            </div>
            <div className="accessory-lanyard" style={{ background: `linear-gradient(to bottom, ${product.color}, #1e293b)` }} />
          </div>
        ) : (
          <div className="product-device-vector">
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
      <div className="product-info">
        <span className="product-flavor-pill" style={{ color: product.color, border: `1px solid ${product.color}40`, backgroundColor: `${product.color}10` }}>
          {product.flavor}
        </span>
        <h3 className="product-name">{product.name}</h3>
        {product.price && (
          <div className="product-price" style={{ margin: "6px 0", fontSize: "16px", fontWeight: "800", color: "var(--foreground)" }}>
            Rs. {product.price.toLocaleString()}
          </div>
        )}

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
