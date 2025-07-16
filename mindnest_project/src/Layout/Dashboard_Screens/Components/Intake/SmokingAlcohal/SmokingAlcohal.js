// components/AlcoholSmokingForm.js
import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore"; // adjust path as needed

const AlcoholSmokingForm = () => {
  const { alcohol, smoking, setAlcohol, setSmoking } = useIntakeStore();

  return (
    <>
      <div className="intake-heading">
        <h5>How frequently do you consume alcohol?</h5>
      </div>
      <div className="tittle-discription cus-para">
        <p className="consumption">Weekly consumption. (i.e. 2 times a week)</p>
      </div>
      <div className="alcohalrange range">
        <input
          type="range"
          min="0"
          max="6"
          step="1"
          value={alcohol}
          onChange={(e) => setAlcohol(Number(e.target.value))}
        />
      </div>
      <ul className="alcohal-range-labels range-labels">
        {[...Array(7)].map((_, i) => (
          <li key={i}><div className="count">{i === 6 ? "6+" : i}</div></li>
        ))}
      </ul>

      <div className="smoke-section">
        <div className="intake-heading">
          <h5>How frequently do you smoke?</h5>
        </div>
        <div className="tittle-discription cus-para">
          <p className="consumption">Weekly consumption. (i.e. 2 times a week)</p>
        </div>
        <div className="alcohalrange range">
          <input
            type="range"
            min="0"
            max="6"
            step="1"
            value={smoking}
            onChange={(e) => setSmoking(Number(e.target.value))}
          />
        </div>
        <ul className="alcohal-range-labels range-labels">
          {[...Array(7)].map((_, i) => (
            <li key={i}><div className="count">{i === 6 ? "6+" : i}</div></li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AlcoholSmokingForm;
