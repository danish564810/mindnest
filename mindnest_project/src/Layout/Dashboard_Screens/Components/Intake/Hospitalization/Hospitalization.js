import React, { useEffect, useState } from 'react';
import useIntakeStore from '../../../../../Store/intakeStore';
import CustomSelect from "../../../../../Plugins/Select2/CustomSelect";

const IntakeCurrentHopitalization = ({ onHospitalizationChange, defaultValue = [] }) => {
  const [selectHospitalization, setSelectHospitalization] = useState(defaultValue);
  const setPastItems = useIntakeStore(state => state.setPastItems);

  // Update local state if defaultValue changes (e.g. after API fetch)
  useEffect(() => {
    setSelectHospitalization(defaultValue);
  }, [defaultValue]);

  // When user changes selection
  const handleChange = (value) => {
    setSelectHospitalization(value);
    setPastItems(value);
    if (onHospitalizationChange) {
      onHospitalizationChange(value);
    }
  };

  return (
    <div className="modal-body-inner intake-modal">
      <div className="modal-title intake-space">
        <h5>Add your Hospitalizations</h5>
      </div>
      <div className="allergies-sec-main">
        <CustomSelect
          isMulti
          creatable
          value={selectHospitalization}
          onChange={handleChange}
          placeholder="Type and press Enter to add hospitalizations..."
        />
      </div>
    </div>
  );
};

export default IntakeCurrentHopitalization;
