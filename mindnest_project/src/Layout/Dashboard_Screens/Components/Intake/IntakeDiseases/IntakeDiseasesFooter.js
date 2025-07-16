import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { submitMedicalConditions } from "../../../../../Api";

const DiseasesFooter = ({ goToNextSlide }) => {
  const { medicalConditions } = useIntakeStore();

  const handleSubmit = async () => {
    try {
      await submitMedicalConditions(medicalConditions);
      goToNextSlide(17);
    } catch (err) {
      console.error("Failed to submit medical conditions", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button type="button" className="btn-modal btn btn-primary" onClick={handleSubmit}>
      Continue
    </button>
  );
};

export default DiseasesFooter;
