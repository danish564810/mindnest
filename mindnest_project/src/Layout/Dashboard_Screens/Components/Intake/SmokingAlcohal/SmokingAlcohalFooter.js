import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { submitAlcoholSmoking } from "../../../../../Api";
const SmokingAlcoholFooter = ({ goToNextSlide }) => {
  const { alcohol, smoking } = useIntakeStore();

  const handleSubmit = async () => {
    const payload = { alcohol, smoking };

    try {
      const res = await submitAlcoholSmoking(payload);
      console.log("Submitted alcohol/smoking:", res);
      goToNextSlide(14); // move to the next slide
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit alcohol/smoking history.");
    }
  };

  return (
    <button
      type="submit"
      className="btn-modal btn btn-primary"
      onClick={handleSubmit}
    >
      Continue
    </button>
  );
};

export default SmokingAlcoholFooter;
