import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";

const Diseases = () => {
  const { medicalConditions, setMedicalCondition } = useIntakeStore();

  const handleMedicalConditionChange = (e) => {
    setMedicalCondition(e.target.id, e.target.checked);
  };

  const conditionList = [
    { id: "SeizuresDisease", label: "Epilepsy/Seizures" },
    { id: "Lqt", label: "Long QT Syndrome" },
    { id: "LD", label: "Liver Disease" },
    { id: "KD", label: "Kidney Disease" },
  ];

  return (
    <div className="modal-body-inner intake-modal">
      <div className="modal-title intake-space">
        <h5>Have you ever been told by a doctor that you have any of these conditions?</h5>
      </div>
      <div className="intake-list des-conditions">
        <ul className="intake-list">
          {conditionList.map(({ id, label }) => (
            <li
              key={id}
              className="intake-items d-flex justify-content-between align-items-center"
            >
              <label htmlFor={id} className="form-check-label">
                {label}
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={medicalConditions[id] || false}
                onChange={handleMedicalConditionChange}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Diseases;
