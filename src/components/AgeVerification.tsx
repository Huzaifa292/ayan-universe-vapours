"use client";

import React, { useState, useEffect } from "react";

import { ShieldAlert, CheckCircle, XCircle } from "lucide-react";

export const AgeVerification: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [isDeclined, setIsDeclined] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleVerify = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  const handleDecline = () => {
    setIsDeclined(true);
  };

  return (
    <>
      {showModal && (
        <div className="age-gate-overlay">
          <div className="age-gate-card">
            <div className="age-gate-header">
              <ShieldAlert className="age-gate-icon" size={48} />
              <h2>Age Verification</h2>
              <p className="age-gate-sub">You must be 18 years of age or older to enter this site.</p>
            </div>

            {!isDeclined ? (
              <div className="age-gate-body">
                <p className="age-gate-disclaimer">
                  This website contains products related to electronic vaporizers. By clicking enter, you agree that you are of legal smoking age in your jurisdiction.
                </p>
                <div className="age-gate-buttons">
                  <button onClick={handleVerify} className="btn btn-primary btn-glow">
                    <CheckCircle size={18} />
                    <span>Yes, I am 18+</span>
                  </button>
                  <button onClick={handleDecline} className="btn btn-secondary">
                    <XCircle size={18} />
                    <span>No, I am under 18</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="age-gate-declined">
                <p className="error-text">
                  Access Denied. You must be at least 18 years old to visit this website.
                </p>
                <div className="decline-redirect-info">
                  Please exit this page if you are under the legal age.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
