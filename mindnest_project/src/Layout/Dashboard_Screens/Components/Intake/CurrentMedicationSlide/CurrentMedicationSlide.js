import React, { useRef } from "react";
import CurrentMedicationSelect from "../CurrentMedication/CurrentMedication";
import { submitCurrentMedications } from "../../../../../Api";
const CurrentMedicationSlide = ({ goToNextSlide }) => {
  const submitRef = useRef(null);

  // Store in global to allow footer to access it
  window.__medSubmit = submitRef;

  return (
    <>
      <div className="modal-body-inner intake-modal">
        <div className="modal-title intake-space">
          <h5>Add your current medications</h5>
        </div>
        
          <CurrentMedicationSelect onSubmit={submitRef} />
       
      </div>

      <div className="modal-footer-inner text-center md-footer">
        <button
          type="button"
          className="btn-modal btn btn-primary"
          onClick={async () => {
            if (submitRef.current) {
              await submitRef.current();
            }
            goToNextSlide(8);
          }}
        >
          Continue
        </button>
        <div className="text-center">
          <button
  type="button"
  className="notApplicable mt-1"
  onClick={async () => {
    try {
      await submitCurrentMedications([], true); // true = skip flag
      goToNextSlide(8);
    } catch (error) {
      console.error("Error skipping medications", error);
      alert("Failed to skip medications");
    }
  }}
>
  Skip
</button>


        </div>
      </div>
    </>
  );
};

export default CurrentMedicationSlide;
