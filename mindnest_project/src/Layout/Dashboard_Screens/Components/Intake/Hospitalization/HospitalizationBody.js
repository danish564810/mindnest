import React, { useEffect, useState } from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import IntakeCurrentHopitalization from "./Hospitalization";

const HospitalizationBody = ({ setSelectHospitalization }) => {
  const pastItems = useIntakeStore((state) => state.pastItems);
  const setPastItems = useIntakeStore((state) => state.setPastItems);
  const [selectHospitalization, setSelectHospitalizationState] = useState(pastItems || []);

  useEffect(() => {
    setSelectHospitalizationState(pastItems || []);
  }, [pastItems]);

  useEffect(() => {
    setSelectHospitalization(selectHospitalization); // updates the ref in parent
  }, [selectHospitalization, setSelectHospitalization]);

  const onHospitalizationChange = (value) => {
    setSelectHospitalizationState(value);
    setPastItems(value);
  };

  return (
    <IntakeCurrentHopitalization
      defaultValue={selectHospitalization}
      onHospitalizationChange={onHospitalizationChange}
    />
  );
};

export default HospitalizationBody;
