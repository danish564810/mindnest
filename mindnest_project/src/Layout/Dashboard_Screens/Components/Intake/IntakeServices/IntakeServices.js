import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";

const Services = () => {
  const { intakeServices, setIntakeServices } = useIntakeStore();

  const handleIntakeServicesChange = (e) => {
    setIntakeServices(e.target.id, e.target.checked);
  };

  const conditionList = [
    { id: "Anxiety", label: "Anxiety" },
    { id: "Depression", label: "Depression" },
    { id: "Insomnia", label: "Insomnia" },
    { id: "Bipolar", label: "Bipolar" },
    { id: "Psychosis", label: "Psychosis" },
    { id: "Schizophrenia", label: "Schizophrenia" }
  ];

  return (
    <div className="modal-body-inner intake-modal">
      <div className="modal-title intake-space">
        <h5>What can we help you with today?</h5>
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
                checked={intakeServices[id] || false}
                onChange={handleIntakeServicesChange}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Services;
