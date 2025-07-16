import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { submitFamilyHistory } from "../../../../../Api";

const FamilyHistoryFooter = ({ goToNextSlide }) => {
  const familyHistory = useIntakeStore((state) => state.familyHistory);

  const handleContinue = async () => {
    try {
      const response = await submitFamilyHistory(familyHistory);
      console.log("Submitted successfully:", response);
      goToNextSlide(12);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <button
      type="submit"
      className="btn-modal btn btn-primary"
      onClick={handleContinue}
    >
      Continue
    </button>
  );
};

export default FamilyHistoryFooter;