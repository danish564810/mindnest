import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";

const HearAboutUs = () => {
  const hearAboutUsAnswers = useIntakeStore((state) => state.hearAboutUsAnswers);
  const setHearAboutUsAnswer = useIntakeStore((state) => state.setHearAboutUsAnswer);
  const otherAboutUsText = useIntakeStore((state) => state.otherAboutUsText);
  const setOtherAboutUsText = useIntakeStore((state) => state.setOtherAboutUsText);

  const handleChange = (e) => {
    const { id, checked } = e.target;
    setHearAboutUsAnswer(id, checked);
  };

  return (
    <div className="modal-body-inner intake-modal">
      <div className="modal-title intake-space">
        <h5>How did you hear about us?</h5>
      </div>
      <div className="intake-list des-conditions">
        <ul className="intake-list">
          {[
            { id: "Internet", label: "Search on internet" },
            { id: "Google", label: "Google ads" },
            { id: "Yelp", label: "Search on Yelp page" },
            { id: "Facebook", label: "Seen on Facebook" },
            { id: "Family", label: "Family member or friend" },
            { id: "Other", label: "Other" },
          ].map(({ id, label }) => (
            <li
              key={id}
              className="intake-items d-flex justify-content-between align-items-center"
            >
              <label htmlFor={id} className="form-check-label">
                {label}
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={hearAboutUsAnswers[id] || false}
                onChange={handleChange}
              />
            </li>
          ))}
        </ul>
        {hearAboutUsAnswers.Other && (
          <div className="mt-3 other-txt">

            <input
              type="text"
              id="otherAboutUsText"
              className="form-control mt-1 text-area"
              value={otherAboutUsText}
              onChange={(e) => setOtherAboutUsText(e.target.value)}
              placeholder="Start Typing..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HearAboutUs;
