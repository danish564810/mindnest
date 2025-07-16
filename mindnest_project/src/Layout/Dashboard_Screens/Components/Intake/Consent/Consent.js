import React, { useState } from "react";
import useIntakeStore from "../../../../../Store/intakeStore";

const Consents = () => {
  const consents = useIntakeStore((state) => state.consents);
 const selectedConsent = useIntakeStore((state) => state.selectedConsent);
  const setSelectedConsent = useIntakeStore((state) => state.setSelectedConsent);

  if (!consents || consents.length === 0) {
    return <div>No Consents Available</div>;
  }

  if (selectedConsent !== null) {
    return (
      <div className="modal-body-inner intake-modal consent-modal">
        <h5>{consents[selectedConsent].title}</h5>
        <div className = "text-consent">
        <div dangerouslySetInnerHTML={{ __html: consents[selectedConsent].body }} />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-body-inner intake-modal consent-modal">
      <div className="modal-title intake-space">
        <h5>Terms & Conditions</h5>
        <h6>Click the link to read these terms and conditions carefully</h6>
      </div>

      <p className="cons-txt">
        {consents.map((consent, index) => (
          <span
            key={index}
            className="c1"
          >
            <a href="#" onClick={() => setSelectedConsent(index)}>
              {consent.title} ,
            </a>
          </span>
        ))}
      </p>
    </div>
  );
};

export default Consents;
