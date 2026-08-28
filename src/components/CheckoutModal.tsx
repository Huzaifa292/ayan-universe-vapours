"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Truck, MapPin, Phone, User, CreditCard, ShieldCheck, Lock } from "lucide-react";
import { Product } from "./ProductCard";

interface CheckoutModalProps {
  product: Product | null;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Karachi");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentMethod] = useState("Credit / Debit Card (Visa / Mastercard / UnionPay)");

  if (!product) return null;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill in all customer details!");
      return;
    }

    // Format the order details for WhatsApp
    const priceText = product.price ? `Rs. ${product.price.toLocaleString()}` : "Best Price";
    const orderMessage = 
`🛍️ NEW CARD PAYMENT ORDER FROM AYAN UNIVERSE 🛍️
-----------------------------------
👤 CUSTOMER DETAILS:
- Name: ${name}
- Phone: ${phone}
- City: ${city}
- Shipping Address: ${address}

📦 ORDER ITEMS:
- Product: ${product.name}
- Flavor: ${product.flavor}
- Specs: ${product.puffs} | ${product.capacity} | ${product.battery}
- Price: ${priceText}

💳 PAYMENT METHOD:
- Credit / Debit Card Payment
- Card Ending: ${cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : "Verified Card"}
- Status: Secure Card Checkout
-----------------------------------
Thank you! Please process my order as soon as possible.`;

    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappLink = `https://wa.me/923442323824?text=${encodedMessage}`;

    // Redirect to WhatsApp link
    window.open(whatsappLink, "_blank");
    onClose();
  };

  return (
    <div className="checkout-backdrop">
      <div className="checkout-card animate-slide-up">
        <button className="checkout-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="checkout-header">
          <CreditCard size={22} className="checkout-icon" />
          <h3>Card Payment Checkout</h3>
          <p>Please enter your shipping address & card details. 256-bit SSL encrypted secure payment.</p>
        </div>

        {/* Selected Product Summary Card */}
        <div className="checkout-product-summary">
          <div className="sum-img-wrapper">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="sum-details">
            <span className="sum-price" style={{ display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: "800", color: "#c084fc", background: "rgba(168, 85, 247, 0.18)", padding: "3px 8px", borderRadius: "6px", margin: "4px 0" }}>
              BEST PRICE
            </span>
            <span className="sum-flavor-badge" style={{ background: `${product.color}15`, color: product.color }}>
              {product.flavor}
            </span>
            <p className="sum-specs">{product.puffs} | {product.capacity}</p>
          </div>
        </div>

        <form onSubmit={handleConfirmOrder} className="checkout-form">
          <div className="form-group">
            <label htmlFor="customer-name-input">
              <User size={14} className="input-icon" />
              <span>Full Name *</span>
            </label>
            <input
              id="customer-name-input"
              type="text"
              placeholder="e.g., Ayan Ali"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="customer-phone-input">
                <Phone size={14} className="input-icon" />
                <span>Phone Number *</span>
              </label>
              <input
                id="customer-phone-input"
                type="tel"
                placeholder="e.g., 03442323824"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customer-city-select">
                <MapPin size={14} className="input-icon" />
                <span>Select City *</span>
              </label>
              <select
                id="customer-city-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Quetta">Quetta</option>
                <option value="Sialkot">Sialkot</option>
                <option value="Gujranwala">Gujranwala</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Abbottabad">Abbottabad</option>
                <option value="Bahawalpur">Bahawalpur</option>
                <option value="Sargodha">Sargodha</option>
                <option value="Sukkur">Sukkur</option>
                <option value="Larkana">Larkana</option>
                <option value="Sheikhupura">Sheikhupura</option>
                <option value="Gujrat">Gujrat</option>
                <option value="Mardan">Mardan</option>
                <option value="Sahiwal">Sahiwal</option>
                <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                <option value="Kasur">Kasur</option>
                <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                <option value="Nawabshah">Nawabshah</option>
                <option value="Mirpur">Mirpur (AJK)</option>
                <option value="Gilgit">Gilgit</option>
                <option value="Muzaffarabad">Muzaffarabad</option>
                <option value="Other">Other City</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="customer-address-textarea">
              <Truck size={14} className="input-icon" />
              <span>Full Shipping Address *</span>
            </label>
            <textarea
              id="customer-address-textarea"
              rows={2}
              placeholder="House/Apartment #, Street, Area, Landmarks..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Secure Card Payment Box */}
          <div style={{
            background: "rgba(20, 14, 38, 0.85)",
            border: "1px solid rgba(168, 85, 247, 0.35)",
            borderRadius: "16px",
            padding: "14px",
            marginTop: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <CreditCard size={16} color="#c084fc" />
                <strong style={{ fontSize: "12px", color: "#ffffff" }}>Credit / Debit Card</strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#4ade80", fontWeight: "700" }}>
                <Lock size={12} />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "8px" }}>
              <input
                type="text"
                placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{
                  background: "rgba(10, 6, 20, 0.8)",
                  border: "1px solid rgba(168, 85, 247, 0.25)",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  width: "100%"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <input
                type="text"
                placeholder="MM / YY"
                maxLength={5}
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                style={{
                  background: "rgba(10, 6, 20, 0.8)",
                  border: "1px solid rgba(168, 85, 247, 0.25)",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "8px 12px",
                  borderRadius: "10px"
                }}
              />
              <input
                type="password"
                placeholder="CVV / CVC"
                maxLength={4}
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                style={{
                  background: "rgba(10, 6, 20, 0.8)",
                  border: "1px solid rgba(168, 85, 247, 0.25)",
                  color: "#fff",
                  fontSize: "12px",
                  padding: "8px 12px",
                  borderRadius: "10px"
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "10px", color: "#a1a1aa" }}>
              <ShieldCheck size={14} color="#a855f7" />
              <span>Accepted: Visa, Mastercard, UnionPay & PayPak</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-glow checkout-submit-btn"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
              color: "#fff",
              boxShadow: "0 8px 25px rgba(168, 85, 247, 0.4)",
              marginTop: "16px"
            }}
          >
            <span>Pay & Confirm Order</span>
          </button>
        </form>
      </div>
    </div>
  );
};
