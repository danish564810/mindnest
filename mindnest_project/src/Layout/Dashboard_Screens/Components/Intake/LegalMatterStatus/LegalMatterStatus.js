// LegalMatterSlideBody.js
import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore"; // adjust path

const LegalMatterSlideBody = ({ errors }) => {
  const { legalMatterText, setLegalMatterText } = useIntakeStore();

  return (
    <div className="modal-body-inner intake-modal">
      <div className="modal-title">
        <h5>Explain your legal matter</h5>
      </div>
      <div className="tittle-discription">
        <p>Please describe your legal matter in detail.</p>
      </div>
      <div className="wrapper">
        <textarea
          value={legalMatterText}
          onChange={(e) => setLegalMatterText(e.target.value)}
          placeholder="Type here..."
          maxLength={1000}
        />
        <div className="word-counter">
          <span className="current-count">{legalMatterText.length}</span>
          <span className="maximum-count">/ 1000</span>
        </div>
      </div>
      {errors && (
          <div style={{ color: "red", marginTop: "8px" }}>
            {errors}
          </div>
        )}
    </div>
  );
};

export default LegalMatterSlideBody;
