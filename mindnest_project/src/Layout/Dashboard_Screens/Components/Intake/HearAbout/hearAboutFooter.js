import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { submitHearAboutUs } from "../../../../../Api";

const HearAboutFooter = ({ goToNextSlide }) => {
  const hearAboutUsAnswers = useIntakeStore((state) => state.hearAboutUsAnswers);
  const otherAboutUsText = useIntakeStore((state) => state.otherAboutUsText);
  const setConsents = useIntakeStore((state) => state.setConsents);

  const handleSubmit = async () => {
    try {
      const response = await submitHearAboutUs(hearAboutUsAnswers, otherAboutUsText);
      
      if (response?.data?.consents) {
        setConsents(response.data.consents);  // save consents into zustand
      }
      
      goToNextSlide(21);
    } catch (error) {
      console.error("Submission failed:", error.message);
    }
  };

  return (
    <button type="submit" className="btn-modal btn btn-primary" onClick={handleSubmit}>
      Continue
    </button>
  );
};

export default HearAboutFooter;
