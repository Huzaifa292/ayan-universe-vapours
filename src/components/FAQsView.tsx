"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Calculator, Cigarette, HelpCircle as HelpIcon } from "lucide-react";

export const FAQsView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Calculator state
  const [cigarettes, setCigarettes] = useState<number>(10);
  const [preference, setPreference] = useState<"smooth" | "strong">("smooth");
  const [recommendation, setRecommendation] = useState<{
    strength: string;
    type: string;
    description: string;
  } | null>(null);

  const faqs = [
    {
      q: "Are the Tokyo E-Juices authentic?",
      a: "Yes, 100%. All our Tokyo Super Cool and Crazy Fruits collections are imported directly from official manufacturers and carry scratch codes on the sides of the boxes which you can verify on the official website."
    },
    {
      q: "How long does delivery take inside Karachi?",
      a: "For orders placed inside Karachi, we deliver on the same day or within 24 hours. For other cities in Pakistan (Lahore, Islamabad, Peshawar, Rawalpindi, etc.), it takes 2-3 business days via Leopard or TCS."
    },
    {
      q: "What is the difference between Salt Nicotine and Freebase?",
      a: "Salt Nicotine (typically 30mg to 50mg) is designed for low-wattage pod devices and provides a faster, smoother throat nicotine absorption rate mimicking real cigarettes. Freebase nicotine (typically 3mg to 12mg) is meant for high-wattage mods/devices and yields bigger clouds but a milder nicotine hit."
    },
    {
      q: "How often should I replace my pod cartridges?",
      a: "Typically, replacement cartridges last between 7 to 14 days, depending heavily on your frequency of usage and the sweetness level of your e-juices. If you experience a burnt taste or loss of flavor, it is time to swap the cartridge."
    },
    {
      q: "Can I return a product if I don't like it?",
      a: "Due to health and hygiene standards, we cannot accept returns on opened e-juices or used cartridges. However, we offer complete warranties on manufacturing defects for start-up devices within 7 days of purchase."
    }
  ];

  const handleCalculate = () => {
    if (cigarettes === 0) {
      setRecommendation({
        strength: "0mg (Nicotine Free)",
        type: "Freebase or Zero-Nicotine Juices",
        description: "Since you do not smoke cigarettes, we highly advise using 0mg nicotine free juices to enjoy the sweet fruit flavors and cloud production without developing any chemical addictions."
      });
    } else if (cigarettes <= 5) {
      setRecommendation({
        strength: "3mg - 6mg (Low Nicotine)",
        type: "Freebase E-Juices",
        description: "For light or social smokers, low nicotine freebase juices are perfect. They yield abundant cloud production and excellent flavor profiles in sub-ohm devices without hitting you with too much nicotine."
      });
    } else if (cigarettes <= 15) {
      setRecommendation({
        strength: "30mg - 35mg (Medium Saltnic)",
        type: "Tokyo Saltnic (30mg or 35mg)",
        description: "For moderate smokers (half a pack daily), 30mg or 35mg Saltnic juices paired with a starter pod device (like the Xlim or Carbon Series) provide the ideal balance of satisfying throat hits and flavor."
      });
    } else {
      setRecommendation({
        strength: "50mg (High Saltnic)",
        type: "Tokyo Saltnic (50mg)",
        description: "For heavy smokers (one pack or more daily) looking to switch to vaping, 50mg Saltnic juices provide the strong nicotine absorption needed to successfully stay off real cigarettes. Use only in low-power pod systems."
      });
    }
  };

  return (
    <div className="faqs-view-page reveal-on-scroll in-view">
      <div className="faqs-banner-header">
        <span className="section-subtitle">Information desk</span>
        <h1 className="section-title">Support & Vaping Guide</h1>
        <p className="faqs-banner-desc">
          Get answers to delivery queries, learn how to maintain pod cartridges, 
          and find your recommended nicotine level using our digital calculator.
        </p>
      </div>

      <div className="faqs-grid-layout">
        {/* FAQs list column */}
        <div className="faqs-list-col">
          <h2>Frequently Asked Questions</h2>
          <div className="faqs-accordion">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item-card ${openIndex === idx ? "open" : ""}`}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <div className="faq-question-row">
                  <div className="faq-q-text">
                    <HelpIcon size={18} className="faq-q-icon" />
                    <span>{faq.q}</span>
                  </div>
                  {openIndex === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openIndex === idx && (
                  <div className="faq-answer-row">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Nicotine Calculator column */}
        <div className="faqs-calc-col">
          <div className="nicotine-calc-card">
            <div className="calc-header">
              <Calculator size={20} className="calc-icon" />
              <h3>Nicotine Strength Calculator</h3>
            </div>
            <p className="calc-intro">
              Enter your current smoking habits to find the exact Tokyo Super Cool juice strength and pod system suited for you.
            </p>

            <div className="calc-form">
              <div className="form-group">
                <label>Daily Cigarettes smoked: <strong>{cigarettes}</strong></label>
                <div className="slider-wrapper">
                  <Cigarette size={16} className="slider-label-icon" />
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={cigarettes}
                    onChange={(e) => setCigarettes(parseInt(e.target.value))}
                    className="calc-slider"
                  />
                </div>
                <span className="slider-hints">
                  {cigarettes === 0 ? "Non-smoker" : cigarettes <= 5 ? "Social Smoker" : cigarettes <= 15 ? "Moderate Smoker" : "Heavy Smoker"}
                </span>
              </div>

              <div className="form-group">
                <label>Vaping hit preference:</label>
                <div className="radio-group">
                  <button 
                    type="button" 
                    className={`radio-btn ${preference === "smooth" ? "selected" : ""}`}
                    onClick={() => setPreference("smooth")}
                  >
                    Smooth Vapor
                  </button>
                  <button 
                    type="button" 
                    className={`radio-btn ${preference === "strong" ? "selected" : ""}`}
                    onClick={() => setPreference("strong")}
                  >
                    Strong Throat Hit
                  </button>
                </div>
              </div>

              <button type="button" onClick={handleCalculate} className="btn btn-glow calc-submit-btn">
                Calculate Recommended strength
              </button>
            </div>

            {recommendation && (
              <div className="calc-result-box">
                <h4>Recommendation:</h4>
                <div className="result-metric">
                  <span className="result-label">Strength:</span>
                  <span className="result-val">{recommendation.strength}</span>
                </div>
                <div className="result-metric">
                  <span className="result-label">Ideal Product:</span>
                  <span className="result-val">{recommendation.type}</span>
                </div>
                <p className="result-description">{recommendation.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
