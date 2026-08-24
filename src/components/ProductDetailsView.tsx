"use client";

import React from "react";
import { X, ShoppingBag, Zap, Flame, Wind, ArrowLeft } from "lucide-react";
import { Product } from "./ProductCard";
import { useCart } from "../context/CartContext";

interface ProductDetailsViewProps {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onProductClick: (product: Product) => void;
  onCheckout: (product: Product) => void;
}

export const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({
  product,
  allProducts,
  onClose,
  onProductClick,
  onCheckout,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  // Get other products of same category or random others (excluding current one)
  const getProductCategory = (p: Product) => {
    return p.id.startsWith("device-") 
      ? "device" 
      : p.id.startsWith("pod-") 
      ? "pod" 
      : p.id.startsWith("coil-")
      ? "coil"
      : p.id.startsWith("accessory-")
      ? "accessory"
      : "juice";
  };

  const currentCategory = getProductCategory(product);

  const related = allProducts
    .filter((p) => p.id !== product.id && getProductCategory(p) === currentCategory)
    .slice(0, 4);

  // If we don't have 4 related products of the same category, fill with others
  const otherProducts = related.length >= 4 
    ? related 
    : [
        ...related,
        ...allProducts.filter((p) => p.id !== product.id && getProductCategory(p) !== currentCategory)
      ].slice(0, 4);

  // Dynamic contrast calculation
  const isColorLight = (hexColor: string): boolean => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 150;
  };

  const btnTextColor = isColorLight(product.color) ? "#000000" : "#ffffff";

  // Dynamic description helper
  const getProductDescription = (p: Product): string => {
    if (p.id.startsWith("device-")) {
      return `The ${p.name} represents the absolute pinnacle of premium design and vaping engineering. Crafted with an ultra-lightweight chassis, it features a built-in ${p.battery} cell with optimized Type-C charging support. Designed for all-day comfort and styling, it includes customizable ${p.puffs} control modes.`;
    }
    if (p.id.startsWith("pod-")) {
      return `Authentic ${p.name} replacement cartridges designed to deliver maximum vapor clarity, rich flavor intensity, and a leakproof experience. This pack features a precision-engineered ${p.battery} coil with a ${p.capacity} capacity and integrated top-fill system.`;
    }
    if (p.id.startsWith("coil-")) {
      return `The ${p.name} is a high-performance replacement heating core engineered to maximize flavor profile and vapor delivery. Featuring a ${p.battery} structure, this pack of coils supports stable heating and smooth vapor production over long lifecycles.`;
    }
    if (p.id.startsWith("accessory-")) {
      return `Enhance your daily vaping setup with the ${p.name}. Built with ${p.battery} and featuring ${p.flavor}, this accessory brings added styling, comfort, and protection to your favorite pod devices.`;
    }
    return `Indulge in the refreshingly crisp flavor of ${p.name}, a world-renowned Tokyo E-Liquid blend. Infused with premium ${p.battery} content in a ${p.capacity} bottle, it features sweet, icy ${p.flavor} notes that satisfy your throat hits and cravings with every single puff.`;
  };

  return (
    <div className="details-overlay">
      <div className="details-container max-width-container">
        {/* Back navigation button */}
        <button onClick={onClose} className="details-back-btn">
          <ArrowLeft size={18} />
          <span>Back to Store</span>
        </button>

        <div className="details-grid-layout">
          {/* Left Column: Product Image Display */}
          <div className="details-image-section">
            <div className="details-image-wrapper">
              {product.image ? (
                <img src={product.image} alt={product.name} className="details-main-img" />
              ) : (
                <div className="placeholder-details-graphic">
                  <Wind size={64} style={{ color: product.color }} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product details */}
          <div className="details-info-section">
            <span className="details-category-tag" style={{ background: `${product.color}15`, color: product.color, border: `1px solid ${product.color}25` }}>
              {product.id.startsWith("device-") ? "Device" : product.id.startsWith("pod-") ? "Pod" : "E-Juice"}
            </span>
            <h1 className="details-title">{product.name}</h1>
            {product.price && (
              <div className="details-price" style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0" }}>
                <span style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.2px", color: "#c084fc", background: "rgba(168, 85, 247, 0.18)", padding: "4px 10px", borderRadius: "8px", border: "1px solid rgba(168, 85, 247, 0.35)" }}>
                  BEST PRICE
                </span>
                <span style={{ fontSize: "28px", fontWeight: "900", color: "#ffffff", letterSpacing: "0.5px" }}>
                  Rs. {product.price.toLocaleString()}
                </span>
              </div>
            )}

            <div className="details-specs-container">
              <div className="details-spec-badge">
                <Zap size={14} />
                <span>{product.puffs}</span>
              </div>
              <div className="details-spec-badge">
                <Flame size={14} />
                <span>{product.capacity}</span>
              </div>
              <div className="details-spec-badge">
                <Wind size={14} />
                <span>{product.battery}</span>
              </div>
            </div>

            <p className="details-desc-paragraph">{getProductDescription(product)}</p>

            {/* Dynamic Delivery Estimator Block */}
            {(() => {
              const getDeliveryDates = () => {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                
                const deliveryStart = new Date(today);
                deliveryStart.setDate(today.getDate() + 2);
                
                const deliveryEnd = new Date(today);
                deliveryEnd.setDate(today.getDate() + 3);

                const formatDate = (date: Date) => {
                  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                };

                return {
                  today: formatDate(today),
                  tomorrow: formatDate(tomorrow),
                  range: `${formatDate(deliveryStart)} - ${formatDate(deliveryEnd)}`
                };
              };
              const dates = getDeliveryDates();

              return (
                <div style={{
                  background: "rgba(26, 16, 46, 0.65)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: "16px",
                  padding: "16px",
                  marginTop: "20px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "16px" }}>🚚</span>
                    <strong style={{ fontSize: "13px", color: "var(--foreground)" }}>
                      Estimated Delivery: {dates.range}
                    </strong>
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--foreground-muted)", marginBottom: "16px", fontWeight: "600" }}>
                    Cash on delivery available • 1 Day Delivery Available in Karachi.
                  </p>

                  {/* Timeline Graphic */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", padding: "0 4px" }}>
                    <div style={{
                      position: "absolute",
                      top: "18px",
                      left: "30px",
                      right: "30px",
                      height: "2px",
                      background: "var(--border-glass)",
                      zIndex: 1
                    }} />
                    
                    {/* Processed */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2, flex: 1 }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "#a855f7",
                        color: "#ffffff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 0 15px rgba(168,85,247,0.5)",
                        fontSize: "14px"
                      }}>
                        📦
                      </div>
                      <span style={{ fontSize: "10px", fontWeight: "800", color: "var(--foreground)", marginTop: "6px", textAlign: "center" }}>Processed</span>
                      <span style={{ fontSize: "9px", color: "var(--foreground-muted)", marginTop: "1px" }}>{dates.today}</span>
                    </div>

                    {/* Shipped */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2, flex: 1 }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(18, 12, 32, 0.9)",
                        border: "1px solid var(--border-glass)",
                        color: "var(--foreground)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        fontSize: "14px"
                      }}>
                        🚚
                      </div>
                      <span style={{ fontSize: "10px", fontWeight: "800", color: "var(--foreground)", marginTop: "6px", textAlign: "center" }}>Shipped</span>
                      <span style={{ fontSize: "9px", color: "var(--foreground-muted)", marginTop: "1px" }}>{dates.tomorrow}</span>
                    </div>

                    {/* Delivered */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2, flex: 1 }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(18, 12, 32, 0.9)",
                        border: "1px solid var(--border-glass)",
                        color: "var(--foreground)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        fontSize: "14px"
                      }}>
                        🎁
                      </div>
                      <span style={{ fontSize: "10px", fontWeight: "800", color: "var(--foreground)", marginTop: "6px", textAlign: "center" }}>Delivered</span>
                      <span style={{ fontSize: "9px", color: "var(--foreground-muted)", marginTop: "1px" }}>{dates.range}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Quantity Selector and Cart/Buy Actions */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", flexWrap: "wrap" }}>
              {/* Quantity Counter */}
              <div style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid var(--border-glass)",
                borderRadius: "30px",
                background: "rgba(26, 16, 46, 0.65)",
                padding: "3px"
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    background: "transparent",
                    color: "var(--foreground)",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "none"
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: "26px", textAlign: "center", fontWeight: "700", fontSize: "13px", color: "var(--foreground)" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    background: "transparent",
                    color: "var(--foreground)",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "none"
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price || 0,
                      flavor: product.flavor,
                      color: product.color
                    });
                  }
                  onClose();
                }}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  borderRadius: "30px",
                  border: "1px solid var(--border-glass)",
                  background: "var(--bg-glass)",
                  color: "var(--foreground)",
                  fontWeight: "700",
                  fontSize: "12px",
                  padding: "12px 0",
                  cursor: "pointer",
                  minWidth: "110px"
                }}
              >
                ADD TO CART
              </button>

              <button
                onClick={() => onCheckout(product)}
                className="btn btn-bubble-hover"
                style={{
                  "--btn-bg-color": "var(--foreground)",
                  "--btn-text-color": "var(--background)",
                  flex: 1,
                  borderRadius: "30px",
                  fontWeight: "700",
                  fontSize: "12px",
                  padding: "12px 0",
                  cursor: "pointer",
                  minWidth: "110px"
                } as React.CSSProperties}
              >
                <span className="bubble-effect" />
                <span className="btn-content">BUY NOW</span>
              </button>
            </div>

            {/* Standalone Order via WhatsApp Button */}
            <div style={{ marginTop: "10px", width: "100%" }}>
              <button
                onClick={() => onCheckout(product)}
                className="btn btn-bubble-hover"
                style={{
                  "--btn-bg-color": "#25D366",
                  "--btn-text-color": "#fff",
                  width: "100%",
                  borderRadius: "30px",
                  fontWeight: "700",
                  fontSize: "13px",
                  padding: "12px 0",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(37, 211, 102, 0.2)"
                } as React.CSSProperties}
              >
                <span className="bubble-effect" />
                <span className="btn-content" style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center" }}>
                  <ShoppingBag size={16} />
                  <span>ORDER VIA WHATSAPP</span>
                </span>
              </button>
            </div>

            {/* WHY CHOOSE US Grid Section */}
            <div style={{ marginTop: "28px", textAlign: "center" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "16px"
              }}>
                <div style={{ flex: 1, height: "1px", background: "var(--border-glass)" }} />
                <span style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing: "1.5px",
                  color: "var(--foreground)",
                  textTransform: "uppercase"
                }}>
                  Why Choose Us
                </span>
                <div style={{ flex: 1, height: "1px", background: "var(--border-glass)" }} />
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px"
              }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: "18px", marginBottom: "6px" }}>💵</div>
                  <strong style={{ fontSize: "9px", color: "var(--foreground)", lineHeight: "1.3", textAlign: "center" }}>Cash On Delivery</strong>
                  <span style={{ fontSize: "8px", color: "var(--foreground-muted)", marginTop: "1px", textAlign: "center" }}>Across Pak</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: "18px", marginBottom: "6px" }}>🔄</div>
                  <strong style={{ fontSize: "9px", color: "var(--foreground)", lineHeight: "1.3", textAlign: "center" }}>7 Days Exchange</strong>
                  <span style={{ fontSize: "8px", color: "var(--foreground-muted)", marginTop: "1px", textAlign: "center" }}>& Returns*</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: "18px", marginBottom: "6px" }}>🚚</div>
                  <strong style={{ fontSize: "9px", color: "var(--foreground)", lineHeight: "1.3", textAlign: "center" }}>Free Shipping</strong>
                  <span style={{ fontSize: "8px", color: "var(--foreground-muted)", marginTop: "1px", textAlign: "center" }}>Above 7,000</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: "18px", color: "#f59e0b", marginBottom: "6px" }}>⭐️</div>
                  <strong style={{ fontSize: "9px", color: "var(--foreground)", lineHeight: "1.3", textAlign: "center" }}>900+ Positive</strong>
                  <span style={{ fontSize: "8px", color: "var(--foreground-muted)", marginTop: "1px", textAlign: "center" }}>Google Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Products display list below */}
        <div className="details-related-section">
          <h3 className="details-related-title">Other Premium Selections</h3>
          <div className="details-related-grid">
            {otherProducts.map((prod) => (
              <div key={prod.id} className="related-item-card" onClick={() => onProductClick(prod)}>
                <div className="related-img-wrapper">
                  <img src={prod.image} alt={prod.name} />
                </div>
                <div className="related-info">
                  <h4>{prod.name}</h4>
                  <p>{prod.flavor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
