"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Truck, MapPin, Phone, User, CheckCircle2 } from "lucide-react";
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
  const [paymentMethod] = useState("Cash on Delivery (COD)");

  if (!product) return null;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill in all checkout details!");
      return;
    }

    // Format the order details for WhatsApp
    const priceText = product.price ? `Rs. ${product.price.toLocaleString()}` : "Price TBD";
    const orderMessage = 
`🛍️ NEW ORDER FROM AYAN UNIVERSE 🛍️
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

💵 PAYMENT METHOD:
- ${paymentMethod}
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
          <ShoppingBag size={22} className="checkout-icon" />
          <h3>Complete Your Order</h3>
          <p>Please enter your billing and shipping address. Clicking submit will send details straight to WhatsApp to confirm your order.</p>
        </div>

        {/* Selected Product Summary Card */}
        <div className="checkout-product-summary">
          <div className="sum-img-wrapper">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="sum-details">
            <h4>{product.name}</h4>
            {product.price && (
              <span className="sum-price" style={{ display: "block", fontSize: "14px", fontWeight: "700", margin: "4px 0" }}>
                Rs. {product.price.toLocaleString()}
              </span>
            )}
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
                <option value="Karachi">Karachi (Same Day)</option>
                <option value="Lahore">Lahore (1-2 Days)</option>
                <option value="Islamabad">Islamabad (1-2 Days)</option>
                <option value="Rawalpindi">Rawalpindi (1-2 Days)</option>
                <option value="Peshawar">Peshawar (2-3 Days)</option>
                <option value="Faisalabad">Faisalabad (2-3 Days)</option>
                <option value="Multan">Multan (2-3 Days)</option>
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
              rows={3}
              placeholder="House/Apartment #, Sector, Area, Landmarks..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="payment-method-box">
            <div className="payment-heading">
              <CheckCircle2 size={16} className="check-icon" />
              <span>Payment Option:</span>
            </div>
            <strong>Cash on Delivery (COD)</strong>
          </div>

          <button
            type="submit"
            className="btn btn-glow checkout-submit-btn"
            style={{
              background: product.color,
              color: "#fff",
              boxShadow: `0 8px 25px ${product.color}35`
            }}
          >
            <span>Confirm Order via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
