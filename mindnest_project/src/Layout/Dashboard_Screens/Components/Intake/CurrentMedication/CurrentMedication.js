import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { fetchMedications, submitCurrentMedications } from "../../../../../Api";
import useIntakeStore from "../../../../../Store/intakeStore";

const CurrentMedicationSelect = ({ onSubmit }) => {
  const { medications, setMedications } = useIntakeStore();
  const [inputTouched, setInputTouched] = useState(medications.length > 0);

  // Fetch options from API
  const loadOptions = async (inputValue) => {
    if (inputValue) setInputTouched(true);
    return await fetchMedications(inputValue);
  };

  // Hook into parent submit
  useEffect(() => {
    if (onSubmit) {
      onSubmit.current = async () => {
        const values = medications.map((opt) => opt.value);
        await submitCurrentMedications(values);
      };
    }
  }, [medications, onSubmit]);

  return (
    <div className="allergies-sec-main">
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      onInputChange={(input) => {
        if (input.length === 0) setInputTouched(false);
        return input;
      }}
      noOptionsMessage={() =>
        inputTouched ? "No medications found" : "Start typing to search"
      }
      onChange={(opts) => setMedications(opts || [])}
      value={medications}
      placeholder="Ex. xanax, abilify, ativan..."
      className="react-select-container"
      classNamePrefix="react-select"
    />
    </div>
  );
};

export default CurrentMedicationSelect;
