import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { submitConsents } from "../../../../../Api";

const ConsentFooter = ({ goToNextSlide }) => {
  const consents = useIntakeStore((state) => state.consents);

  const handleSubmit = async () => {
    try {
      await submitConsents(consents);
      goToNextSlide(21);
    } catch (error) {
      console.error("Submission failed:", error.message);
    }
  };

  return (
    <button type="submit" className="btn-modal btn btn-primary" onClick={handleSubmit}>
      I Agree
    </button>
  );
};

export default ConsentFooter;
