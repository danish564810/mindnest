import React, { useEffect, useState } from "react";
import CustomSelect from "../../../../../Plugins/Select2/CustomSelect";
import useIntakeStore from "../../../../../Store/intakeStore"; // ✅ import Zustand

const IntakeCurrentAllergies = ({ onAllergyChange }) => {
  const { items, setItems, } = useIntakeStore();
  const [selectAllergies, setSelectAllergies] = useState([]);

  // ✅ Load allergies from Zustand on component mount
  useEffect(() => {
    if (items?.length > 0) {
      setSelectAllergies(items);
      if (onAllergyChange) {
        onAllergyChange(items); // Keep parent ref in sync
      }
    }
  }, [items, onAllergyChange]);

  const handleChange = (value) => {
    setSelectAllergies(value);  // local
    setItems(value);            // Zustand
    if (onAllergyChange) {
      onAllergyChange(value);   // pass to parent
    }
  };

  return (
    <div className="modal-body-inner intake-modal">
      <div className="modal-title intake-space">
        <h5>Add your Allergies</h5>
      </div>
      <div className="allergies-sec-main">
        <CustomSelect
          isMulti
          creatable
          value={selectAllergies}
          onChange={handleChange}
          placeholder="Type and press Enter to add medications..."
        />
      </div>
    </div>
  );
};

export default IntakeCurrentAllergies;
