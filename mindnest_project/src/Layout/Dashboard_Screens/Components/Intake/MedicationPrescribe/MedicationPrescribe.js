import React from "react";
import { intakeMedicationPrecscribe } from "../../../../../Api";

const MedicationPrescribe = ()=>{
    return(
        <>
        <div className="modal-body-inner intake-modal">
        <div className="intake-heading">
          <h5>If prescribed, would you like your medications to be shipped to you?</h5>
        </div>
        <p>
          We have partnered with Genoa Healthcare to provide you with convenient
          pharmacy options regardless of where you live. You may also choose to
          your own local pharmacy.
        </p>
        </div>
        </>
    )
}
export default MedicationPrescribe