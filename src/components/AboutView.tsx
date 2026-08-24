"use client";

import React from "react";
import { ShieldAlert, Truck, MessageSquare, MapPin, Calendar, Clock } from "lucide-react";

interface AboutViewProps {
  activeColor: string;
}

export const AboutView: React.FC<AboutViewProps> = ({ activeColor }) => {
  return (
    <div className="about-view-page reveal-on-scroll in-view">
      <div className="about-banner-header">
        <span className="section-subtitle">Our Heritage</span>
        <h1 className="section-title">About Ayan Universe</h1>
        <p className="about-banner-desc">
          Pakistan's premium hub for premium-grade pods, mods, and original Tokyo E-juice collections.
        </p>
      </div>

      <div className="about-grid-content">
        <div className="about-story-col">
          <h2>Pioneering Vapour Excellence</h2>
          <p>
            Established with a vision to deliver premium quality, authentic, and state-of-the-art vaping systems,
            Ayan Universe has grown to represent the pinnacle of trust and satisfaction in the Pakistani vaping community.
          </p>
          <p>
            We strictly source directly from manufacturers and official distributors to guarantee that every single bottle of
            Tokyo E-Juice, replacement pod, and starter mod is **100% authentic and original**.
          </p>

          <div className="corporate-features-list">
            <div className="corp-feature-item">
              <div className="corp-icon" style={{ background: `${activeColor}15`, color: activeColor }}>
                <ShieldAlert size={20} />
              </div>
              <div className="corp-text">
                <h4>Authenticity Guaranteed</h4>
                <p>Verify scratch codes directly on our packaging. 100% refund policy if products fail verification checks.</p>
              </div>
            </div>
            <div className="corp-feature-item">
              <div className="corp-icon" style={{ background: `${activeColor}15`, color: activeColor }}>
                <Truck size={20} />
              </div>
              <div className="corp-text">
                <h4>Next-Day Nationwide Shipping</h4>
                <p>Get express cash on delivery shipping across Karachi, Lahore, Islamabad, and other major cities within 24-48 hours.</p>
              </div>
            </div>
            <div className="corp-feature-item">
              <div className="corp-icon" style={{ background: `${activeColor}15`, color: activeColor }}>
                <MessageSquare size={20} />
              </div>
              <div className="corp-text">
                <h4>24/7 Dedicated Support</h4>
                <p>Connect instantly with our customer support agents on WhatsApp to get recommendations and order updates.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-qr-col">
          <div className="about-qr-card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--foreground)", letterSpacing: "0.5px" }}>SCAN TO CHAT & ORDER</h3>
            <div style={{
              background: "#fff",
              padding: "12px",
              borderRadius: "16px",
              boxShadow: `0 0 20px ${activeColor}40`,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <img
                src="/images/QRCODE.png"
                alt="Ayan Universe QR Code"
                style={{ width: "180px", height: "180px", objectFit: "contain" }}
              />
            </div>
            <p style={{ color: "var(--foreground-muted)", fontSize: "0.85rem", maxWidth: "260px", margin: "10px auto 0 auto" }}>
              Scan this QR code to connect directly with us on WhatsApp and place your order instantly!
            </p>
          </div>

          <div className="store-details-glass-card">
            <h3>Store Details</h3>
            <div className="store-detail-row">
              <MapPin size={16} style={{ color: activeColor }} />
              <span>DHA Phase 6, Karachi, Pakistan</span>
            </div>
            <div className="store-detail-row">
              <Calendar size={16} style={{ color: activeColor }} />
              <span>Monday - Sunday (7 Days Open)</span>
            </div>
            <div className="store-detail-row">
              <Clock size={16} style={{ color: activeColor }} />
              <span>12:00 PM - 02:00 AM PST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
