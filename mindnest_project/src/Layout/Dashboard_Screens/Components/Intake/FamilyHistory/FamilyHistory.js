import React from "react";
import useIntakeStore from "../../../../../Store/intakeStore";

const FamilyHistory = () => {
  const familyHistory = useIntakeStore((state) => state.familyHistory);
  const updateFamilyHistory = useIntakeStore((state) => state.updateFamilyHistory);
  const illnesses = useIntakeStore((state) => state.illnesses);
  const relatives = useIntakeStore((state) => state.relatives);

  return (
    <div className="modal-body-inner intake-modal">
      <div className="modal-title">
        <h5>Family History</h5>
      </div>
      <div className="tittle-discription">
        <p>
          Tell us about any history of mental illness in your parents,
          grandparents, siblings, and relatives.
        </p>
      </div>

      <div className="zui-wrapper">
        <div className="zui-scroller">
          <table className="zui-table">
            <thead>
              <tr>
                <th className="zui-sticky-col">
                  <h6 className="des-name mb-0">Illness</h6>
                </th>
                {relatives.map((relative) => (
                  <th key={relative}>
                    <h6 className="des-rel mb-0 text-capitalize">
                      {relative.replace(/([A-Z])/g, " $1")}
                    </h6>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {illnesses.map((illness, illnessIndex) => (
                <tr key={illness}>
                  <td className="zui-sticky-col">
                    <h6 className="mb-0 text-capitalize">{illness}</h6>
                  </td>
                  {relatives.map((relative) => (
                    <td key={relative}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        // Defensive check: If familyHistory is empty or missing, default to false
                        checked={familyHistory?.[illnessIndex]?.[relative] || false}
                        onChange={() => updateFamilyHistory(illnessIndex, relative)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FamilyHistory;
