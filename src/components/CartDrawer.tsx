"use client";

import React, { useState } from "react";

import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all details.");
      return;
    }

    // Format cart items for WhatsApp
    const itemsMessage = cart
      .map((item) => `- ${item.name} (${item.flavor}) x${item.quantity} (Best Price)`)
      .join("\n");

    const orderMessage = 
`🛒 NEW MULTI-ITEM ORDER FROM AYAN UNIVERSE 🛒
-----------------------------------
👤 CUSTOMER DETAILS:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email || "N/A"}
- Shipping Address: ${formData.address}

📦 ORDER ITEMS:
${itemsMessage}

💵 PRICING: Best Price
💳 PAYMENT METHOD: ${formData.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Credit/Debit Card (Mock)"}
-----------------------------------
Thank you! Please process my order as soon as possible.`;

    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappLink = `https://wa.me/923442323824?text=${encodedMessage}`;

    setCheckoutStep("success");
    
    // Redirect to WhatsApp link
    window.open(whatsappLink, "_blank");

    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      setCheckoutStep("cart");
      setFormData({ name: "", email: "", phone: "", address: "", paymentMethod: "cod" });
    }, 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="cart-backdrop"
            onClick={() => {
              setIsCartOpen(false);
              setCheckoutStep("cart");
            }}
          />

          {/* Cart Panel Drawer */}
          <div className="cart-drawer">
            {/* Drawer Header */}
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingBag size={22} className="accent-glow-text" />
                <h3>Your Cart</h3>
                {cart.length > 0 && <span className="cart-badge-count">{cart.length}</span>}
              </div>
              <button
                className="cart-close"
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep("cart");
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="cart-content">
              {checkoutStep === "cart" && (
                <>
                  {cart.length === 0 ? (
                    <div className="cart-empty">
                      <ShoppingBag size={48} className="empty-icon" />
                      <p>Your cart is empty.</p>
                      <p className="empty-sub">Explore our next-gen pods and add them here!</p>
                      <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="cart-items-wrapper">
                      <div className="cart-items-list">
                        {cart.map((item) => (
                          <div key={item.id} className="cart-item">
                            <div
                              className="cart-item-color-indicator"
                              style={{ backgroundColor: item.color }}
                            />
                            <div className="cart-item-details">
                              <h4 className="cart-item-name">{item.name}</h4>
                              <p className="cart-item-flavor">{item.flavor}</p>
                              <div className="cart-item-price-actions">
                                 <span className="cart-item-price" style={{ color: "#c084fc", fontWeight: "800", fontSize: "11px", letterSpacing: "1px" }}>BEST PRICE</span>
                                <div className="cart-quantity-selector">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="quantity-btn"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="quantity-value">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="quantity-btn"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="cart-item-remove-btn"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Cart Footer / Summary */}
                      <div className="cart-footer">
                        <div className="cart-summary-line">
                          <span>Pricing</span>
                          <span className="cart-subtotal-val" style={{ color: "#c084fc", fontWeight: "800" }}>BEST PRICE</span>
                        </div>
                        <div className="cart-summary-line shipping">
                          <span>Shipping</span>
                          <span className="shipping-badge">FREE</span>
                        </div>
                        <div className="cart-divider-line" />
                        <div className="cart-summary-line total">
                          <span>Total</span>
                          <span className="cart-total-val" style={{ color: "#c084fc", fontWeight: "800" }}>BEST PRICE</span>
                        </div>
                        <button
                          className="btn btn-primary btn-checkout w-full mt-4 btn-glow"
                          onClick={() => setCheckoutStep("form")}
                        >
                          <CreditCard size={18} />
                          <span>Secure Checkout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "form" && (
                <div className="checkout-form-container">
                  <h4 className="checkout-title">Order Information</h4>
                  <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 300 1234567"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Delivery Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street, City, Country"
                        rows={3}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Payment Method</label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                      >
                        <option value="cod">Cash on Delivery (COD)</option>
                        <option value="card">Credit/Debit Card (Mock)</option>
                      </select>
                    </div>

                    <div className="checkout-actions">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep("cart")}
                        className="btn btn-secondary"
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary btn-glow">
                        Place Order (Best Price)
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {checkoutStep === "success" && (
                <div className="checkout-success-container">
                  <div className="success-icon-wrapper">
                    <Sparkles className="success-sparkles animate-pulse" size={32} />
                    <ShoppingBag className="success-bag" size={64} />
                  </div>
                  <h3>Order Placed Successfully!</h3>
                  <p>Thank you for buying from **Ayan Universe**.</p>
                  <p className="success-sub">
                    We will process your order soon and send a confirmation to{" "}
                    <strong>{formData.email || "your email"}</strong>.
                  </p>
                  <div className="loading-bar-wrapper">
                    <div className="loading-bar-fill" />
                  </div>
                  <span className="success-redirect-note">Redirecting to shop...</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
