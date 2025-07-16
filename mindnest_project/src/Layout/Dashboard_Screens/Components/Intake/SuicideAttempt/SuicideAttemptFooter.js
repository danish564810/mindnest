import { submitSuicideAttemt } from "../../../../../Api";
import useIntakeStore from "../../../../../Store/intakeStore";

const SuicideAttemp = ({ goToNextSlide }) => {
  const setStatus = useIntakeStore((s) => s.setSuicide);

  const handleSubmit = async (value) => {
    try {
      setStatus(value); // update Zustand
      await submitSuicideAttemt(value); // call API
      goToNextSlide(19);
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

export default SuicideAttemp;
