import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { PatientLegalMatterDiscription } from "../../../../../Api";

const LegalMatterSlideFooter = ({ goToNextSlide, setErrors }) => {
  const { legalMatterText } = useIntakeStore();

  const handleSubmit = async () => {
    setErrors(""); // Clear previous error
    try {
      await PatientLegalMatterDiscription(legalMatterText);
      goToNextSlide(16);
    } catch (err) {
      console.error("Failed to save legal matter:", err);
      // Extract backend error message
      if (err.response?.data?.errors?.length) {
        setErrors(err.response.data.errors[0]);
      } else if (err.response?.data?.message) {
        setErrors(err.response.data.message);
      } else {
        setErrors("Could not save your legal matter. Please try again.");
      }
    }
  };
 const isDisabled = legalMatterText.trim().length === 0;
  return (
    <button
      type="button"
      className="btn-modal btn btn-primary"
      onClick={handleSubmit}
      disabled={isDisabled}
    >
      Continue
    </button>
  );
};

export default LegalMatterSlideFooter;
