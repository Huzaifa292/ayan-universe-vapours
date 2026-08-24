"use client";

import React from "react";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";

export const ContactView: React.FC = () => {
  return (
    <div className="contact-view-page reveal-on-scroll in-view">
      <div className="contact-banner-header">
        <span className="section-subtitle">Reach Out</span>
        <h1 className="section-title">Contact Support Hub</h1>
        <p className="contact-banner-desc">
          Have questions regarding order tracking, deliveries, or need flavor advice? 
          Scan our QR code or reach out directly via one of our official support channels.
        </p>
      </div>

      <div className="contact-grid-layout">
        {/* Quick Contact Cards */}
        <div className="contact-info-col">
          <h2>Direct Communication Channels</h2>
          <p className="contact-info-intro">
            Our agents are online 7 days a week from 12:00 PM to 02:00 AM PST. 
            Select any channel to contact us immediately.
          </p>

          <div className="quick-contact-cards-list">
            <a href="https://wa.me/923442323824" target="_blank" rel="noopener noreferrer" className="quick-contact-card">
              <MessageCircle size={24} className="contact-card-icon whatsapp-icon" />
              <div className="card-details">
                <h4>WhatsApp Live Chat</h4>
                <p className="value-text">+92 344 2323824</p>
                <span className="action-hint">Click to open chat window</span>
              </div>
            </a>

            <div className="quick-contact-card">
              <MapPin size={24} className="contact-card-icon location-icon" />
              <div className="card-details">
                <h4>Store Location</h4>
                <p className="value-text">DHA Phase 6, Karachi, Pakistan</p>
                <span className="action-hint">Cash on Delivery available</span>
              </div>
            </div>

            <div className="quick-contact-card">
              <Mail size={24} className="contact-card-icon email-icon" />
              <div className="card-details">
                <h4>Corporate Support Email</h4>
                <p className="value-text">support@ayanuniverse.com</p>
                <span className="action-hint">Typically responds in 12 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp QR Code Card on the Right */}
        <div className="contact-form-col">
          <div className="about-qr-card" style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-glass)",
            borderRadius: "24px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 15px 35px rgba(15, 23, 42, 0.05)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px"
          }}>
            <h3 style={{ 
              fontSize: "1.4rem", 
              fontWeight: "800", 
              color: "var(--foreground)", 
              letterSpacing: "0.5px",
              margin: 0
            }}>
              SCAN TO CHAT & ORDER
            </h3>
            
            <div style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0, 112, 243, 0.15)",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <img
                src="/images/QRCODE.png"
                alt="Ayan Universe WhatsApp QR Code"
                style={{ width: "220px", height: "220px", objectFit: "contain" }}
              />
            </div>
            
            <p style={{ 
              color: "var(--foreground-muted)", 
              fontSize: "0.95rem", 
              maxWidth: "300px", 
              margin: 0,
              lineHeight: "1.6"
            }}>
              Scan this QR code with your phone's camera to connect directly with our support team on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
