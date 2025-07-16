import React, { useState } from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { submitSocialHistory } from "../../../../../Api";

const SocialHistorySlide = ({ goToNextSlide }) => {
  const { socialHistory, setSocialHistory } = useIntakeStore();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const result = await submitSocialHistory({ socialHistory });

    if (!result.success) {
      setError(result.errors?.[0] || "Something went wrong.");
      return;
    }

    setError(""); // Clear previous errors
    goToNextSlide(11);
  };

  return (
    <div className="modal-body-inner intake-modal">
      <div className="modal-title">
        <h5>Social History</h5>
      </div>
      <div className="tittle-discription">
        <p>
          Tell us if you live with parents and/or family. Also about your support groups,
          work, school, pets and social activities.
        </p>
      </div>

      <div className="wrapper">
        <textarea
          autoComplete="off"
          placeholder="Type here..."
          value={socialHistory}
          onChange={(e) => {
            setSocialHistory(e.target.value);
            setError(""); // ⬅️ Clear error when user types
          }}
          maxLength={1000}
        />
        <div className="word-counter">
          <span className="current-count">{socialHistory.length}</span>
          <span className="maximum-count">/ 1000</span>
        </div>
    </div>
{error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}
      <div className="modal-footer-inner text-center md-footer">
        <button
          type="button"
          className="btn-modal btn btn-primary"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SocialHistorySlide;
