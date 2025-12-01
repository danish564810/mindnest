import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { intakePatientDiseases } from "../../../../../Api";

const DiseasesFooter = ({ goToNextSlide }) => {
  const { medicalConditions } = useIntakeStore();
    const isAnySelected = Object.values(medicalConditions).some(Boolean);

  const handleSubmit = async () => {
    try {
      await intakePatientDiseases(medicalConditions, false);
      goToNextSlide(17);
    } catch (err) {
      console.error("Failed to submit medical conditions", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSkip = async () => {
    try {
      await intakePatientDiseases(medicalConditions, true); // pass true for skip
      goToNextSlide(17);
    } catch (err) {
      console.error("Failed to submit as not applicable", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="modal-footer-inner">
      <button type="button" className="btn-modal btn btn-primary" onClick={handleSubmit} disabled={!isAnySelected}>
        Continue
      </button>
      <div className="text-center">
        <button type="button" className="notApplicable mt-1" onClick={handleSkip}>
          Not applicable
        </button>
      </div>
    </div>
  );
};

export default DiseasesFooter;
