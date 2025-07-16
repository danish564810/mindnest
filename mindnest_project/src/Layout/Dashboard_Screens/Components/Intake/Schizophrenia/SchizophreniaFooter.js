import { submitSchizophreniaStatus } from "../../../../../Api";
import useIntakeStore from "../../../../../Store/intakeStore";

const SchizophreniaFooter = ({ goToNextSlide }) => {
  const setStatus = useIntakeStore((s) => s.setSchizophreniaPsychosisDetected);

  const handleSubmit = async (value) => {
    try {
      setStatus(value); // update Zustand
      await submitSchizophreniaStatus(value); // call API
      goToNextSlide(18);
    } catch (error) {
      console.error("Error submitting schizophrenia status:", error);
    }
  };

  return (
    <div className="btn-intake d-flex">
      <div className="btn-left">
        <button
          type="submit"
          className="btn-left-inner btn-modal"
          onClick={() => handleSubmit(true)}
        >
          Yes
        </button>
      </div>
      <div className="btn-right">
        <button
          type="submit"
          className="btn-right-inner"
          onClick={() => handleSubmit(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default SchizophreniaFooter;
