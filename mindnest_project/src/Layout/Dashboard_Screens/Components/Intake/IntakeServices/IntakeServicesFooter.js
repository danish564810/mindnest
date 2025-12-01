import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { submitServices } from "../../../../../Api";

const ServicesFooter = ({ goToNextSlide }) => {
  const { intakeServices } = useIntakeStore();
 const isAnySelected = Object.values(intakeServices).some(Boolean);
  const handleSubmit = async () => {
    try {
      await submitServices(intakeServices);
      goToNextSlide(20);
    } catch (err) {
      console.error("Failed to submit medical conditions", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button type="button" className="btn-modal btn btn-primary" onClick={handleSubmit}  disabled={!isAnySelected}>
      Continue
    </button>
  );
};

export default ServicesFooter;
