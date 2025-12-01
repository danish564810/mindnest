import React, { useState, useRef, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Button, Form, FormGroup, ProgressBar } from "react-bootstrap";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { AuthContext } from "../../../../context/AuthContext";
import DateTimePicker from "../../../../Plugins/DateTimePicker/DateTimePicker";
import CustomSelect from "../../../../Plugins/Select2/CustomSelect";
import ringOne from "../../../../../src/assests/images/re-1.png"
import ringTwo from "../../../../../src/assests/images/re-2.png"
import ringThree from "../../../../../src/assests/images/re-3.png"
import ringFour from "../../../../../src/assests/images/re-4.png"
import "./Modal.css";
import useIntakeStore from "../../../../Store/intakeStore";
import { intakePatientStatusApi } from "../../../../Api";
import { intakeIndependentPatientApi } from "../../../../Api";
import DivorceSlide from "../Intake/Divorce/Divorce";
import DependentPatientForm from "../Intake/DependentPatient/DependentPatient";
import IntakeIndependentPatientForm from "../Intake/IntakeIndependentPatientForm/IntakeIndependentPatientForm";
import DrivingLicenseSlide from "../Intake/License/License";
import MedicationPrescribe from "../Intake/MedicationPrescribe/MedicationPrescribe";
import { intakeMedicationPrecscribeApi } from "../../../../Api";
import IntakeCurrentAllergies from "../Intake/AddAllergies/AddAllergies";
import { intakeAllergyApi } from "../../../../Api";
import { skipAllergyApi } from "../../../../Api";
import { submitSelectedPharmacy } from "../../../../Api";
import { intakeHospitalizationApi } from "../../../../Api";
import PharmacySlideBody from "../Intake/PharmacyList/PharmacyList";
import CurrentMedicationSlide from "../Intake/CurrentMedicationSlide/CurrentMedicationSlide";
import SocialHistorySlide from "../Intake/SocialHistory/SocialHistory";
import FamilyHistory from "../Intake/FamilyHistory/FamilyHistory";
import FamilyHistoryFooter from "../Intake/FamilyHistory/FamilyHistoryFooter";
import HospitalizationBody from "../Intake/Hospitalization/HospitalizationBody";
import AlcoholSmokingForm from "../Intake/SmokingAlcohal/SmokingAlcohal";
import SmokingAlcoholFooter from "../Intake/SmokingAlcohal/SmokingAlcohalFooter";
import { PatientLegalMatterStatus } from "../../../../Api";
import LegalMatterSlideBody from "../Intake/LegalMatterStatus/LegalMatterStatus";
import LegalMatterSlideFooter from "../Intake/LegalMatterStatus/LegalMatterFooter";
import Diseases from "../Intake/IntakeDiseases/IntakeDiseases";
import DiseasesFooter from "../Intake/IntakeDiseases/IntakeDiseasesFooter";
import SchizophreniaFooter from "../Intake/Schizophrenia/SchizophreniaFooter";
import SuicideAttemp from "../Intake/SuicideAttempt/SuicideAttemptFooter";
import Services from "../Intake/IntakeServices/IntakeServices";
import ServicesFooter from "../Intake/IntakeServices/IntakeServicesFooter";
import HearAboutUs from "../Intake/HearAbout/HearAbout";
import HearAboutFooter from "../Intake/HearAbout/hearAboutFooter";
import Consents from "../Intake/Consent/Consent";
import ConsentFooter from "../Intake/Consent/consentFooter";
import AnimatedSlideWrapper from "../AnimatedSlideWrapper/AnimatedSlideWrapper";
import { fetchIntakeTaskView } from "../../../../Api";



import { title } from "framer-motion/client";
import { id } from "date-fns/locale";

const gender = [
  { value: "Male", label: "Male" },
  { value: "Female ", label: "Female" },
  { value: "Other ", label: "Other" },
];

const relationship = [
  { value: "Brother", label: "Brother" },
  { value: "Daughter ", label: "Daughter" },
  { value: "Father", label: "Father" },
  { value: "Friend", label: "Friend" },
  { value: "Grandfather", label: "Grandfather" },
  { value: "Grandmother", label: "Grandmother" },
  { value: "Legal guardian", label: "Legal guardian" },
  { value: "Mother", label: "Mother" },
  { value: "Relative", label: "Relative" },
  { value: "Sister", label: "Sister" },
  { value: "Son", label: "Son" },
  { value: "Under relationship", label: "Under relationship" },
];

const meritalStatus = [
  { value: "Divorced", label: "Divorced" },
  { value: "Married", label: "Married" },
  { value: "Separated", label: "Separated" },
  { value: "Single", label: "Single" },
  { value: "Widowed", label: "Widowed" },
];



const IntakeModal = ({ show, close, taskId }) => {
  const [drivingFront, setDrivingFront] = useState("");
  const [drivingBack, setDrivingBack] = useState("");
  const [divorceImageContent, setDivorceImageContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { divorceImage, setDivorceImage } = useIntakeStore();
  const [errors, setErrors] = useState();
  const allergiesRef = useRef([]);
  const hospitalizationRef = useRef([]);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  const setSelectHospitalization = (value) => {
    hospitalizationRef.current = value;
    setIsContinueEnabled(value && value.length > 0);
  };

  const setAllergiesSelected = (value) => {
    allergiesRef.current = value;
  };
  let selectedPharmacyRef = { current: null };

  const slideContent = [
    // intake slide 1(index 0) New Patient
    {
      id: "PatientStatusSlide",
      title: "Onboard Intake",
      discriptionHeading: "Are you a new patient?",
      discriptionParagraph:
        "You would be a new patient with us if you have not seen anyone in our group practice within the past 3 years.",
      renderBody: () => null,
      renderFooter: (goToNextSlide) => {
        const handlePatientStatus = async (isNew) => {
          try {
            console.log("Sending patientStatus:", isNew);
            const saveResponse = await intakePatientStatusApi(isNew);
            console.log("Save response:", saveResponse);

            const result = await fetchIntakeTaskView();
            console.log("Fetched intake task view after save:", result);

            if (result.success && result.data?.patientStatus?.patientStatus !== undefined) {
              const updatedStatus = result.data.patientStatus.patientStatus;
              setFormData((prev) => ({
                ...prev,
                newPatient: updatedStatus,
              }));
            }

            goToNextSlide();
          } catch (err) {
            console.error("Patient status update failed:", err);
            alert("Failed to save patient status. Please try again.");
          }
        };


        return (
          <div className="btn-intake d-flex">
            <div className="btn-left">
              <button
                type="button"
                className="btn-left-inner btn-modal"
                onClick={() => handlePatientStatus(true)} // New patient = true
              >
                Yes
              </button>
            </div>
            <div className="btn-right">
              <button
                type="button"
                className="btn-right-inner"
                onClick={() => handlePatientStatus(false)} // Existing patient = false
              >
                No
              </button>
            </div>
          </div>
        );
      },
    },
    // intake slide 2(index 1) register new patient 
    {
      id: "YourselfOtherSlide",
      title: "Onboarding Intake",
      discriptionHeading: "Are you registering yourself or someone else?",
      discriptionParagraph:
        "If the patient is 13 years old or younger then a legal guardian or a biological parent must register and accompany the patient.",
      renderBody: () => null,
      renderFooter: (goToNextSlide) => (
        <div className="btn-intake d-flex">
          <div className="btn-left">
            <button
              type="button"
              className="btn-left-inner btn-modal"
              onClick={async () => {
                try {
                  setRegisteringFor("myself");
                  goToNextSlide();
                  await intakePatientStatusApi({ depIndepStatus: "Independent" }); // or your actual API call
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Myself
            </button>
          </div>
          <div className="btn-right">
            <button
              type="button"
              className="btn-right-inner"
              onClick={async () => {
                try {
                  setRegisteringFor("someone_else");
                  goToNextSlide();
                  await intakePatientStatusApi({ depIndepStatus: "Dependent" });
                } catch (err) {
                  console.error(err);
                }
              }}

            >
              Someone else
            </button>
          </div>
        </div>
      ),
    },

    // intake slide 3(index 2) Independent Patient
    // {
    //   id: "IntakeIndependentPatientForm",
    //   title: "Onboard Intake",
    //   discriptionHeading: "Tell us about yourself",
    //   renderBody: (goToNextSlide) => {
    //     const genderOptions = [
    //       { label: "Male", value: "male" },
    //       { label: "Female", value: "female" },
    //       { label: "Other", value: "other" },
    //     ];

    //     const IntakeIndependentPatientFormBody = () => {
    //       const today = new Date();
    //       const intakeIndependentPatientForm = useIntakeStore(
    //         (state) => state.intakeIndependentPatientForm
    //       );
    //       const setIntakeIndependentPatientField = useIntakeStore(
    //         (state) => state.setIntakeIndependentPatientField
    //       );
    //       const [errors, setErrors] = useState({});

    //       const getSafeForm = (form) => ({
    //         firstName: form.firstName || '',
    //         lastName: form.lastName || '',
    //         dob: form.dob || null,
    //         gender: form.gender || '',
    //         address: form.address || '',
    //         state: form.state || '',
    //         city: form.city || '',
    //         zipCode: form.zipCode || '',
    //       });

    //       const [localForm, setLocalForm] = useState(getSafeForm(intakeIndependentPatientForm));

    //       useEffect(() => {
    //         setLocalForm(getSafeForm(intakeIndependentPatientForm));
    //       }, [intakeIndependentPatientForm]);

    //       const handleChange = (field, value) => {
    //         setLocalForm((prev) => ({ ...prev, [field]: value }));
    //       };

    //       const handleSubmit = async (e) => {
    //         e.preventDefault();

    //         const formData = {
    //           FirstName: localForm.firstName,
    //           LastName: localForm.lastName,
    //           DOB: localForm.dob ? format(new Date(localForm.dob), "MM/dd/yyyy") : "",
    //           Gender: localForm.gender,
    //           FullAddress: localForm.address,
    //           Address: localForm.address,
    //           State: localForm.state || "Texas",
    //           City: localForm.city || "Los Angeles",
    //           ZipCode: localForm.zipCode || "77584",
    //         };

    //         const response = await intakeIndependentPatientApi(formData);

    //         if (response.success) {
    //           setErrors({});
    //           setIntakeIndependentPatientField(localForm);
    //           goToNextSlide();
    //         } else {
    //           const fieldErrors = {};
    //           response.errors?.forEach((msg) => {
    //             const lower = msg.toLowerCase();
    //             if (lower.includes("first name")) fieldErrors.firstName = msg;
    //             else if (lower.includes("last name")) fieldErrors.lastName = msg;
    //             else if (lower.includes("dob")) fieldErrors.dob = msg;
    //             else if (lower.includes("gender")) fieldErrors.gender = msg;
    //             else if (lower.includes("address")) fieldErrors.address = msg;
    //           });
    //           setErrors(fieldErrors);
    //         }
    //       };

    //       return (
    //         <Form className="frmcls" onSubmit={handleSubmit}>
    //           <div className="fcins">
    //             <Form.Group controlId="formName">
    //               <div className="name-fields row fspc">
    //                 <div className="first-name fields col-6 ps-0">
    //                   <Form.Label>First Name</Form.Label>
    //                   <Form.Control
    //                     type="text"
    //                     value={localForm.firstName}
    //                     onChange={(e) => handleChange("firstName", e.target.value)}
    //                     isInvalid={!!errors.firstName}
    //                   />
    //                   {errors.firstName && (
    //                     <div className="text-danger">{errors.firstName}</div>
    //                   )}
    //                 </div>
    //                 <div className="last-name fields col-6 pe-0">
    //                   <Form.Label>Last Name</Form.Label>
    //                   <Form.Control
    //                     type="text"
    //                     value={localForm.lastName}
    //                     onChange={(e) => handleChange("lastName", e.target.value)}
    //                     isInvalid={!!errors.lastName}
    //                   />
    //                   {errors.lastName && (
    //                     <div className="text-danger">{errors.lastName}</div>
    //                   )}
    //                 </div>
    //               </div>
    //             </Form.Group>

    //             <Form.Group controlId="formBasicGender">
    //               <div className="dob-gender row fspc">
    //                 <div className="user-dob fields col-6 ps-0">
    //                   <Form.Label>Date of Birth</Form.Label>
    //                   <DateTimePicker
    //                     layout="dashboard"
    //                     selected={localForm.dob}
    //                     onChange={(date) => handleChange("dob", date)}
    //                     format="MM/DD/YYYY"
    //                     minDate={new Date("1900-01-01")}
    //                     maxDate={today}
    //                   />
    //                   {errors.dob && (
    //                     <div className="text-danger">{errors.dob}</div>
    //                   )}
    //                 </div>
    //                 <div className="gender fields col-6 pe-0">
    //                   <Form.Label>Gender</Form.Label>
    //                   <CustomSelect
    //                     options={genderOptions}
    //                     layout="dashboard"
    //                     value={genderOptions.find(opt => opt.value === localForm.gender)}
    //                     onChange={(e) => handleChange("gender", e.value)}
    //                   />
    //                   {errors.gender && (
    //                     <div className="text-danger">{errors.gender}</div>
    //                   )}
    //                 </div>
    //               </div>
    //             </Form.Group>

    //             <Form.Group controlId="formBasicAddress">
    //               <div className="user-address fspc">
    //                 <Form.Label>Address</Form.Label>
    //                 <Form.Control
    //                   type="text"
    //                   value={localForm.address}
    //                   onChange={(e) => handleChange("address", e.target.value)}
    //                   isInvalid={!!errors.address}
    //                 />
    //                 {errors.address && (
    //                   <div className="text-danger">{errors.address}</div>
    //                 )}
    //               </div>
    //             </Form.Group>
    //           </div>

    //           <div className="modal-footer-content text-center">
    //             <Button className="btn-modal" type="submit">
    //               Submit
    //             </Button>
    //           </div>
    //         </Form>
    //       );
    //     };

    //     return <IntakeIndependentPatientFormBody />;
    //   },
    // },


    // intake slide 4(index 3) Dependent Patient
    // {
    //   id: "DependentPatientSlide",
    //   title: "Onboard Intake",
    //   renderBody: (key, setKey, checkedItems, handleCheckboxChange, goToNextSlide) => (
    //     <DependentPatientForm setKey={setKey} key={key} goToNextSlide={goToNextSlide} setErrors={setErrors} errors={errors} />
    //   ),
    // },

    //dependant and independant 
    {
      id: "PatientFormSlide",
      title: "Onboard Intake",
      renderBody: (goToNextSlide) => {
        if (registeringFor === "myself") {
          return <IntakeIndependentPatientForm goToNextSlide={goToNextSlide} />;
        } else if (registeringFor === "someone_else") {
          return <DependentPatientForm goToNextSlide={goToNextSlide} setFormData={setFormData} />;
        } else {
          return <p>Please go back and select who you are registering for.</p>;
        }
      },
    },



    //intake slide 5 (index 4) divorce slide 
    {
      id: 'DivorceImageSlide',
      title: 'Onboarding Intake',
      renderBody: (goToNextSlide) => (

        <DivorceSlide
          goToNextSlide={goToNextSlide}
          divorceImageContent={divorceImageContent}
          setDivorceImageContent={setDivorceImageContent}
          ringOne={ringOne}
          ringTwo={ringTwo}
          ringThree={ringThree}
          ringFour={ringFour}

        />
      ),
    },
    // intake slide 6(index 5) Driving License 
    {
      id: 'DrivingImagesSlide',
      title: 'Upload Driving License',
      renderBody: (goToNextSlide) => (
        <DrivingLicenseSlide
          goToNextSlide={goToNextSlide}
          drivingFront={drivingFront}
          setDrivingFront={setDrivingFront}
          drivingBack={drivingBack}
          setDrivingBack={setDrivingBack}
          ringOne={ringOne}
          ringTwo={ringTwo}
          ringThree={ringThree}
          ringFour={ringFour}

        />
      ),
    },
    // intake slide 7(index 6) medication prescribe 
    {
      id: "MedicationPrescribedSlide",
      title: "Onboarding Intake",
      renderBody: () => <MedicationPrescribe />,
      renderFooter: (goToNextSlide) => (
        <div className="btn-intake d-flex">
          <div className="btn-left">
            <button
              type="submit"
              className="btn-left-inner btn-modal"
              onClick={async () => {
                try {
                  await intakeMedicationPrecscribeApi(true);
                  goToNextSlide(7);
                } catch (err) {
                  console.error("Failed to submit medication preference (Yes):", err);
                  alert("Something went wrong. Please try again.");
                }
              }}
            >
              Yes
            </button>
          </div>
          <div className="btn-right">
            <button
              type="submit"
              className="btn-right-inner"
              onClick={async () => {
                try {
                  await intakeMedicationPrecscribeApi(false);
                  goToNextSlide(8);
                } catch (err) {
                  console.error("Failed to submit medication preference (Yes):", err);
                  alert("Something went wrong. Please try again.");
                }
              }}
            >
              No
            </button>
          </div>
        </div>
      )
    },
    // intake slide 8(index 7) current medication
    {
      id: "IntakeCurrentMedicationForm",
      title: "Onboard Intake",
      renderBody: (goToNextSlide) => (
        <CurrentMedicationSlide goToNextSlide={goToNextSlide} />
      ),
    },

    // intake slide 9(index 8) select Pharmacy 
    {
      id: "PharmacySlide",
      title: "Onboard Intake",
      renderBody: () => (
        <PharmacySlideBody
          onSelect={(pharmacy) => {
            selectedPharmacyRef.current = pharmacy;
          }}
        />
      ),
      renderFooter: (goToNextSlide) => {
        const PharmacyFooter = () => {
          const selectedPharmacy = useIntakeStore((state) => state.selectedPharmacy);

          return (
            <div className="modal-footer-inner">
              <button
                type="button"
                className="btn-modal btn btn-primary"
                disabled={!selectedPharmacy}
                onClick={() => {
                  goToNextSlide(9);
                }}
              >
                Continue
              </button>
              <div className="text-center">
                <button
                  type="button"
                  className="notApplicable mt-1"
                  onClick={async () => {
                    try {
                      await submitSelectedPharmacy({
                        taskId: null,
                        name: "",
                        address: "",
                        IsNotApplicable: true,
                      });
                      goToNextSlide(9); // or whatever your next slide index is
                    } catch (error) {
                      console.error("Error skipping pharmacy:", error);
                      alert("Failed to skip pharmacy");
                    }
                  }}
                >
                  Skip
                </button>

              </div>
            </div>
          );
        };

        return <PharmacyFooter />;
      },
    },
    // intake slide 10(index 9) Allergies
    {
      id: "AllergiesSlide",
      title: "Onboarding Intake",
      renderBody: () => (
        <IntakeCurrentAllergies onAllergyChange={setAllergiesSelected} />
      ),
      renderFooter: (goToNextSlide) => (
        <div className="modal-footer-inner">
          <button
            type="button"
            className="btn-modal btn btn-primary"
            disabled={!allergiesRef.current || allergiesRef.current.length === 0}
            onClick={async () => {
              try {
                const allergyValues = allergiesRef.current.map(
                  (a) => a.value || a.label
                );
                const res = await intakeAllergyApi(allergyValues, false);
                console.log("Submitted all allergies:", allergyValues, res);
                goToNextSlide(10);
              } catch (error) {
                console.error("Error submitting allergies", error);
                alert("Failed to submit allergies");
              }
            }}
          >
            Continue
          </button>
          <div className="text-center">
            <button
              type="button"
              className="notApplicable mt-1"
              onClick={async () => {
                try {
                  const res = await intakeAllergyApi([], true);
                  console.log("Skipped allergies:", res);
                  goToNextSlide(10);
                } catch (error) {
                  console.error("Failed to skip allergies", error);
                  alert("Error skipping allergies");
                }
              }}
            >
              Skip
            </button>
          </div>
        </div>
      ),
    },


    // intake slide 11(index 10) social history
    {
      id: "SocialHistorySlide",
      title: "Onboarding Intake",
      renderBody: (goToNextSlide) => (
        <SocialHistorySlide goToNextSlide={goToNextSlide} />
      ),
    },
    // intake slide 12(index 11) Family history
    {
      id: "FamilyHistorySlide",
      title: "Onboarding Intake",
      renderBody: () => (
        <>
          <FamilyHistory />
        </>
      ),
      renderFooter: (goToNextSlide) => <FamilyHistoryFooter goToNextSlide={goToNextSlide} />,
    },
    // intake slide 13(index 12) Hospitalization
    {
      id: "HospitalizationHistorySlide",
      title: "Onboarding Intake",
      renderBody: () => (
        <HospitalizationBody setSelectHospitalization={setSelectHospitalization} />
      ),
      renderFooter: (goToNextSlide) => (
        <div className="modal-footer-inner">
          <button
            type="button"
            className="btn-modal btn btn-primary"
            disabled={!isContinueEnabled}
            onClick={async () => {
              try {
                const hospitalizationValue = hospitalizationRef.current.map(
                  (a) => a.value || a.label
                );
                const res = await intakeHospitalizationApi(hospitalizationValue);
                console.log("Submitted all hospitalizations:", hospitalizationValue, res);
                goToNextSlide(13);
              } catch (error) {
                console.error("Error submitting hospitalizations", error);
                alert("Failed to submit hospitalizations");
              }
            }}
          >
            Continue
          </button>

          <div className="text-center">
            <button
              type="button"
              className="notApplicable mt-1"
              onClick={async () => {
                try {
                  await intakeHospitalizationApi([], true);
                  goToNextSlide(13);
                } catch (error) {
                  console.error("Failed to skip hospitalization", error);
                  alert("Something went wrong while skipping.");
                }
              }}
            >
              Skip
            </button>
          </div>
        </div>
      ),
    },

    // intake slide 14(index 13) Smoking and Alcohal
    {
      id: "AlcoholSmokingSlide",
      title: "Onboarding Intake",
      renderBody: () => <AlcoholSmokingForm />,
      renderFooter: (goToNextSlide) => <SmokingAlcoholFooter goToNextSlide={goToNextSlide} />,
    },
    // intake slide 15(index 14) Legal Matter Status
    {
      id: "LegalIssueSlide",
      title: "Onboarding Intake",
      renderBody: () => (
        <>
          <div className="modal-body-inner intake-modal">
            <div className="intake-heading">
              <h5>Is this request for any legal matter?</h5>
            </div>
            <p>
              Are you requesting this appointment for any legal
              issues such as child custody, disability, job clearances,
              or worker’s comp related matter?
            </p>
          </div>
        </>
      ),
      renderFooter: (goToNextSlide) => {
        const handleLegalMatter = async (isLegalMatter) => {
          try {
            await PatientLegalMatterStatus(isLegalMatter);  // No need to pass token
            if (isLegalMatter) {
              goToNextSlide(15); // Go to legal matter details
            } else {
              goToNextSlide(16); // Skip legal matter
            }
          } catch (err) {
            console.error("Patient status update failed:", err);
            alert("Failed to save patient status. Please try again.");
          }
        };

        return (
          <div className="btn-intake d-flex">
            <div className="btn-left">
              <button
                type="button"
                className="btn-left-inner btn-modal"
                onClick={() => handleLegalMatter(true)}
              >
                Yes
              </button>
            </div>
            <div className="btn-right">
              <button
                type="button"
                className="btn-right-inner"
                onClick={() => handleLegalMatter(false)}
              >
                No
              </button>
            </div>
          </div>
        );
      }
    },
    // intake slide 16(index 15) Legal matter discription
    {
      id: "LegalMatterSlide",
      title: "Onboarding Intake",
      renderBody: () => <LegalMatterSlideBody errors={errors} />,
      renderFooter: (goToNextSlide) => (
        <LegalMatterSlideFooter goToNextSlide={goToNextSlide} setErrors={setErrors} />
      ),
    },
    // intake slide 17(index 16) diseases slide 
    {
      id: "DiseaseSlide",
      title: "Onboarding Intake",
      renderBody: () => <Diseases />,
      renderFooter: (goToNextSlide) => <DiseasesFooter goToNextSlide={goToNextSlide} />
    },
    // intake slide 18(index 17)  schizophrenia Pscyhosis Detected Slide
    {
      id: "SchizophreniaPsychosisDetectedSlide",
      title: "Onboarding Intake",
      renderBody: () => (
        <>
          <div className="modal-body-inner intake-modal">
            <div class="intake-heading">
              <h5>Have you ever been told by a doctor that you have schizophrenia or psychosis?</h5>
            </div>
            <p>
              Have you ever felt that you could hear things that other people didn't
              think were real, that a mysterious
              force was inserting thoughts into your head, that you had
              special powers, or that people were plotting to harm you?
            </p>
          </div>
        </>
      ),
      renderFooter: (goToNextSlide) => <SchizophreniaFooter goToNextSlide={goToNextSlide} />
    },
    // intake slide 19(index 18) Suicide Attempt
    {
      id: "SuicideAttemptSlide",
      title: "Onboarding Intake",
      renderBody: () => (
        <>
          <div className="modal-body-inner intake-modal">
            <div class="intake-heading">
              <h5>Have you attempted suicide before?</h5>
            </div>
            <p>
              This will help us determine the level of care needed for you.
            </p>
          </div>
        </>
      ),
      renderFooter: (goToNextSlide) => <SuicideAttemp goToNextSlide={goToNextSlide} />
    },
    // intake slide 20(index 19) Intake Services
    {
      id: "ServiceSlide",
      title: "Onboarding Intake",
      renderBody: () => <Services />,
      renderFooter: (goToNextSlide) => <ServicesFooter goToNextSlide={goToNextSlide} />
    },
    // intake slide 21(index 20) Hear about us
    {
      id: "HearAboutUsSlide",
      title: "Onboarding Intake",
      renderBody: () => <HearAboutUs />,
      renderFooter: (goToNextSlide) => <HearAboutFooter goToNextSlide={goToNextSlide} />
    },
    // consent modal intake slide 22 (index 21)
    {
      id: "ConsentsSlide",
      title: "Onboarding Intake",
      renderBody: () => (<Consents />),
      renderFooter: () => (<ConsentFooter goToNextSlide={goToNextSlide} />)
    }

  ];


  const { currentStep } = useIntakeStore();
  const totalSlides = slideContent.length;
  const currentSlide = slideContent[currentStep];
  const newProgress = ((currentStep + 1) / totalSlides) * 100;
  console.log("Current Slide Index:", currentStep);
  console.log("Total Slides:", slideContent.length);

  const [direction, setDirection] = useState('forward');
  const [slideHistory, setSlideHistory] = useState([]);
  const [key, setKey] = useState('About-you');
  const [animationClass, setAnimationClass] = useState('');
  const [checkedItems, setCheckedItems] = useState({
    releaseInfo: false,
    emergencyContact: false,
  });
  // const [alcoholValue, setAlcoholValue] = useState(0);
  // const [smokingValue, setSmokingValue] = useState(0);
  const [medicalConditions, setMedicalConditions] = useState({
    SeizuresDisease: false,
    Lqt: false,
    LD: false,
    KD: false,
  });
  const [desiredServices, setDesiredServices] = useState({
    Anxiety: false,
    Depression: false,
    Insomnia: false,
    Bipolar: false,
    Psychosis: false,
    Schizophrenia: false,
  });
  const [hearAboutUsAnswers, setHearAboutUsAnswers] = useState({
    Internet: false,
    Google: false,
    Yelp: false,
    Facebook: false,
    Family: false,
    Other: false,
  });
  const [registeringFor, setRegisteringFor] = useState(null);
  const selectedConsent = useIntakeStore((state) => state.selectedConsent);
  const setSelectedConsent = useIntakeStore((state) => state.setSelectedConsent);


  //progress state
  const [progress, setProgress] = useState(0);




  // progressbar 
  useEffect(() => {
    const timer = setTimeout(() => {
      const newProgress = (currentStep / (totalSlides - 1)) * 100;
      setProgress(newProgress);
    }, 50);

    return () => clearTimeout(timer);
  }, [currentStep, totalSlides]);

  //  const [items, setItems] = useState([]);
  // const [pastItems, setPastItems] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setCurrentStep,
    setShowParentSection,
    setShowDependentSection,
    setIntakeData,
    setItems,
    setPastItems,
    setIntakeIndependentPatientField,
    setDependentPatientField,
    setDrivingLicenseImage,
    setSelectedPharmacy,
    setMedications,
    setSocialHistory,
    setAlcohol,
    setSmoking,
    setLegalMatterText,
    setMedicalCondition,
    setIntakeServices,
    setHearAboutUsAnswer,
    setOtherAboutUsText,
  } = useIntakeStore();
  const [formData, setFormData] = useState({
    newPatient: '',
    myself: false,
    dependent: false,
    firstName: '',
    lastName: '',
    dob: null,
    gender: '',
    address: '',
    state: '',
    city: '',
    zip: '',
    releaseOfInformation: false,
    emergencyContact: false,
    relationship: '',
    maritalStatus: '',
    depFirstName: '',
    depLastName: '',
    depDob: null,
    depGender: '',
    depAddress: '',
    depState: '',
    depCity: '',
    depZip: '',
    drivingFront: null,
    drivingBack: null,
    divorceImageContent: null,
    showLocalPharmacy: false,
    pharmacy: null,
    medications: [],
    allergies: [],
    hospitalization: [],
    socialHistory: '',
    alcoholConsumption: [],
    smokingFrequency: [],
    pregency: '',
    legalMatter: '',
    legal: '',
    conditions: [],
    services: [],
    hearAboutUs: [],
    hearAboutUsOther: '',
    schizophreniaPsychosisDetected: false,
    suicideAttempt: false,
    consents: null,
  });


  useEffect(() => {
    if (!user) return;

    fetchIntakeTaskView()
      .then(result => {
        if (!result.success) return;

        const data = result.data;
        console.log("Fetched intake data:", data);


        setIntakeData(data);

        const newFormData = {};
        // new patient 

        newFormData.newPatient = data.patientStatus?.patientStatus ?? '';
        //Independant patient 
        if (data.depIndepStatus === "Independent") {
          setShowParentSection(false);
          setShowDependentSection(false);
          setRegisteringFor("myself");

          newFormData.myself = true;
          newFormData.dependent = false;

          const p = data.independentPatient ?? {};
          newFormData.firstName = p.firstName ?? '';
          newFormData.lastName = p.lastName ?? '';
          newFormData.dob = p.dob ?? null;
          newFormData.gender = p.gender ?? '';
          newFormData.address = p.address ?? '';
          newFormData.state = p.state ?? '';
          newFormData.city = p.city ?? '';
          newFormData.zip = p.zipCode ?? '';


          setIntakeIndependentPatientField({
            firstName: p.firstName ?? '',
            lastName: p.lastName ?? '',
            dob: p.dob ?? null,
            gender: p.gender ?? '',
            address: p.address ?? '',
          });

        }
        //dependant patient
        if (data.depIndepStatus === "Dependent") {
          setShowParentSection(true);
          setShowDependentSection(true);
          setRegisteringFor("someone_else");
          newFormData.myself = false;
          newFormData.dependent = true;

          const g = data.dependentPatient ?? {};
          newFormData.firstName = g.guardianFirstName ?? '';
          newFormData.lastName = g.guardianLastName ?? '';
          newFormData.dob = g.guardianDOB ?? null;
          newFormData.gender = g.guardianGender ?? '';
          newFormData.address = g.guardianAddress ?? '';
          newFormData.state = g.guardianState ?? '';
          newFormData.city = g.guardianCity ?? '';
          newFormData.zip = g.guardianZipCode ?? '';

          newFormData.releaseOfInformation = g.guardianReleaseInformation ?? false;
          newFormData.emergencyContact = g.guardianEmergencyContact ?? false;
          newFormData.relationship = g.guardianRelationship ?? '';
          newFormData.maritalStatus = g.guardianMaritalStatus ?? '';

          newFormData.depFirstName = g.firstName ?? '';
          newFormData.depLastName = g.lastName ?? '';
          newFormData.depDob = g.dob ?? null;
          newFormData.depGender = g.gender ?? '';
          newFormData.depAddress = g.address ?? '';
          newFormData.depState = g.state ?? '';
          newFormData.depCity = g.city ?? '';
          newFormData.depZip = g.zipCode ?? '';
          setDependentPatientField("guardianFirstName", g.guardianFirstName ?? "");
          setDependentPatientField("guardianLastName", g.guardianLastName ?? "");
          setDependentPatientField("guardianDob", g.guardianDOB ? new Date(g.guardianDOB) : null);
          setDependentPatientField("guardianGender", g.guardianGender ?? "");
          setDependentPatientField("guardianAddress", g.guardianAddress ?? "");
          setDependentPatientField("guardianState", g.guardianState ?? "");
          setDependentPatientField("guardianCity", g.guardianCity ?? "");
          setDependentPatientField("guardianZipCode", g.guardianZipCode ?? "");
          setDependentPatientField("relationship", g.guardianRelationship ?? "");
          setDependentPatientField("maritalStatus", g.guardianMaritalStatus ?? "");
          setDependentPatientField("releaseInfo", g.guardianReleaseInformation ?? false);
          setDependentPatientField("emergencyContact", g.guardianEmergencyContact ?? false);

          setDependentPatientField("dependentFirstName", g.firstName ?? "");
          setDependentPatientField("dependentLastName", g.lastName ?? "");
          setDependentPatientField("dependentDob", g.dob ? new Date(g.dob) : null);
          setDependentPatientField("dependentGender", g.gender ?? "");
          setDependentPatientField("dependentAddress", g.address ?? "");
          setDependentPatientField("dependentState", g.state ?? "");
          setDependentPatientField("dependentCity", g.city ?? "");
          setDependentPatientField("dependentZipCode", g.zipCode ?? "");
        }
        //divorce
        newFormData.divorceImageContent = data?.divorced?.divorceHidden ?? null;
        //driving 
        if (data?.driving) {
          if (data.driving.drivingFrontImageHidden) {
            setDrivingLicenseImage("front", data.driving.drivingFrontImageHidden);
          }
          if (data.driving.drivingBackImageHidden) {
            setDrivingLicenseImage("back", data.driving.drivingBackImageHidden);
          }
        }

        //medical prescription
        newFormData.showLocalPharmacy = data?.medicationPrescribeVM?.patientStatus ?? false;
        //fetch selec pharmacy
        if (data.pharmacy) {
          newFormData.pharmacy = {
            id: data.pharmacy.pharmacyId ?? null,
            name: data.pharmacy.name ?? '',
            address: data.pharmacy.address ?? '',
            initials: (data.pharmacy.name ?? '')
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
          };

          if (data.pharmacy?.pharmacyId) {
            setSelectedPharmacy({
              id: data.pharmacy.pharmacyId,
              text: data.pharmacy.name,
              html: data.pharmacy.address,
            });

          }
        }

        //medication
        setMedications(
          data.currentMedicationVM?.medication
            ? data.currentMedicationVM.medication.split(",").map(med => ({ label: med, value: med }))
            : []
        );
        //allergies
        if (data.allergieVM?.allergies) {
          const allergiesArray = data.allergieVM.allergies.split(",");
          newFormData.allergies = allergiesArray;
          setItems(allergiesArray.map((r) => ({ label: r, value: r })));

          allergiesRef.current = allergiesArray.map((r) => ({ label: r, value: r }));
        }

        //social history
        newFormData.socialHistory = data.socialHistoryVM?.socialHistory ?? '';
        setSocialHistory(newFormData.socialHistory);
        //Family history
        const { illnesses, relatives, setFamilyHistory } = useIntakeStore.getState();

        if (Array.isArray(data.familyHistoryVM)) {
          const formattedFamilyHistory = illnesses.map((illness) => {
            // find matching illness object from backend data
            const match = data.familyHistoryVM.find(item => item.illness === illness);
            const row = {};

            relatives.forEach(relative => {
              row[relative] = match ? match[relative] || false : false;
            });

            return row;
          });

          setFamilyHistory(formattedFamilyHistory);
        }
        //hospitalization

        if (data.hospitalizationHistoryVM?.hospitalizationHistory) {
          newFormData.hospitalization = data.hospitalizationHistoryVM.hospitalizationHistory.split(",");
          setPastItems(newFormData.hospitalization.map((r) => ({ label: r, value: r })));
        }
        //alcohal smoking 
        if (data.alcoholSmokingtVM) {
          newFormData.alcoholConsumption = [data.alcoholSmokingtVM.alcohol ?? ''];
          newFormData.smokingFrequency = [data.alcoholSmokingtVM.smoking ?? ''];
          setAlcohol(data.alcoholSmokingtVM.alcohol ?? 0);
          setSmoking(data.alcoholSmokingtVM.smoking ?? 0);
        }
        //pragnancy
        newFormData.pregency = data.pregencyVM?.pregency ?? '';
        //legal issue
        if (data.legalmatterVM?.legalmatter) {
          setLegalMatterText(data.legalmatterVM.legalmatter);
        }
        //legal matter
        newFormData.legal = data.legalVM?.legal ?? '';
        //diseases
        if (data.diseases) {
          newFormData.conditions = [
            { title: "Epilepsy/Seizures", selected: data.diseases.seizures ?? false },
            { title: "Long QT Syndrome", selected: data.diseases.longQTSyndrome ?? false },
            { title: "Liver Disease", selected: data.diseases.liverDisease ?? false },
            { title: "Kidney Disease", selected: data.diseases.kidneyDisease ?? false },
          ];

          setMedicalCondition("SeizuresDisease", data.diseases.seizures ?? false);
          setMedicalCondition("Lqt", data.diseases.longQTSyndrome ?? false);
          setMedicalCondition("LD", data.diseases.liverDisease ?? false);
          setMedicalCondition("KD", data.diseases.kidneyDisease ?? false);
        }
        // services
        if (data.service) {
          newFormData.services = [
            { title: "Anxiety", selected: data.service.anxiety ?? false },
            { title: "Depression", selected: data.service.depression ?? false },
            { title: "Insomnia", selected: data.service.insomnia ?? false },
            { title: "Bipolar", selected: data.service.bipolar ?? false },
            { title: "Psychosis", selected: data.service.psychosis ?? false },
            { title: "Schizophrenia", selected: data.service.schizophrenia ?? false },
          ];

          setIntakeServices("Anxiety", data.service.anxiety ?? false);
          setIntakeServices("Depression", data.service.depression ?? false);
          setIntakeServices("Insomnia", data.service.insomnia ?? false);
          setIntakeServices("Bipolar", data.service.bipolar ?? false);
          setIntakeServices("Psychosis", data.service.psychosis ?? false);
          setIntakeServices("Schizophrenia", data.service.schizophrenia ?? false);
        }
        //schizophreniaPsychosis
        newFormData.schizophreniaPsychosisDetected = data.schizophreniaPsychosisDetected?.patientStatus ?? false;
        //sucide
        newFormData.suicideAttempt = data.suicideAttempt?.patientStatus ?? false;

        //hear about us 
        if (data.hear) {
          const hearMap = {
            Internet: data.hear.searchOnInternet ?? false,
            Google: data.hear.googleAds ?? false,
            Yelp: data.hear.yelpPage ?? false,
            Facebook: data.hear.facebook ?? false,
            Family: data.hear.familymemberorfriend ?? false,
            Other: data.hear.other ?? false,
          };

          // ✅ This will update all checkbox states in Zustand at once
          Object.entries(hearMap).forEach(([key, value]) => {
            setHearAboutUsAnswer(key, value);
          });

          // ✅ Set "Other" input field if it exists
          if (data.hear.otherAboutUs) {
            setOtherAboutUsText(data.hear.otherAboutUs);
          }
        }
        //consent
        newFormData.consents = data.tempConsents ?? null;



        setFormData(prev => ({
          ...prev,
          ...newFormData, // ✅ merges only once
        }));

        // Set current step based on intake registration status
        const stepMap = {
          Dependency: 1,
          Divorce: 3,
          Driving: 4,
          MedicationPrescribe: 5,
          Pharmacy: 6,
          CurrentMedication: 7,
          Allergies: 8,
          SocialHistory: 9,
          FamilyHistory: 10,
          HospitalizationHistory: 11,
          AlcoholSmoking: 12,
          Pregnant: 13,
          LegalIssue: 14,
          LegalMatter: 15,
          Diseases: 16,
          PsychosisDetected: 17,
          Suicide: 18,
          Service: 19,
          HearAboutUs: 20,
          Consents: 21,
        };

        setCurrentStep(stepMap[data.registrationIntakeStatus] ?? 0);

      })
      .catch(console.error);
  }, [
    user,
    setItems,
    setPastItems,
    setCurrentStep,
    setShowParentSection,
    setShowDependentSection,
    setIntakeData,
  ]);

  const handleHearAboutUsChange = (e) => {
    const { id, checked } = e.target;
    setHearAboutUsAnswers((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleServiceChange = (e) => {
    const { id, checked } = e.target;
    setDesiredServices((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };
  const handleMedicalConditionChange = (e) => {
    const { id, checked } = e.target;
    setMedicalConditions((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const goToNextSlide = () => {
    const { dependent, maritalStatus, newPatient, gender, showLocalPharmacy, legal } = formData;

    const go = (n) => setCurrentStep(currentStep + n);

    // Step-specific logic
    if (currentStep === 2) {
      if (!dependent) return go(2); // skip dependent

      // If dependent is divorced, go directly to step 3
      const status = maritalStatus?.toLowerCase();
      return status === "divorced" ? setCurrentStep(3) : go(2);
    }

    if (currentStep === 5 && showLocalPharmacy) return go(newPatient ? 2 : 3);
    if (currentStep === 6) return go(newPatient ? 1 : 2);
    if (currentStep === 8) return go(newPatient ? 1 : 3);
    if (currentStep === 11) return newPatient ? go(1) : gender === "female" ? go(2) : go(5);
    if (currentStep === 12) return gender === "female" ? go(1) : go(2);
    if (currentStep === 13) return go(newPatient ? 1 : 3);
    if (currentStep === 14 && !legal) return go(2);
    if (currentStep === 21) return;

    setDirection("forward");
    setCurrentStep(currentStep + 1);
  };



  const goToPreviousSlide = () => {
    const values = formData;
    const { dependent, newPatient, gender, showLocalPharmacy, legal } = values;

    const back = (n) => setCurrentStep(currentStep - n);

    // Step 4 back → Step 3 for divorce, otherwise Step 2
    if (currentStep === 4 && dependent) {
      const dependentMaritalStatus = dependent.maritalStatus?.toLowerCase();
      if (dependentMaritalStatus === "divorced") {
        // Go back to Step 3 (divorce screen)
        setShowParentSection(false);
        setShowDependentSection(true);
        return setCurrentStep(3);
      } else {
        // Normal case: back to Step 2
        setShowParentSection(true);
        setShowDependentSection(false);
        return setCurrentStep(2);
      }
    }

    // Step 3 back → Step 2 (divorced flow)
    if (currentStep === 3) {
      setShowParentSection(true);
      setShowDependentSection(false);
      return setCurrentStep(2);
    }

    // Other step-specific back logic
    if (currentStep === 7 && showLocalPharmacy) return back(2);
    if (currentStep === 8 && showLocalPharmacy && !newPatient) return back(3);
    if (currentStep === 8 && !newPatient) return back(2);
    if (currentStep === 8 && newPatient) return back(1);
    if (currentStep === 11 && !newPatient) return back(3);
    if (currentStep === 12 && newPatient) return back(1);
    if (currentStep === 13) return !newPatient ? back(2) : back(1);
    if (currentStep === 14)
      return newPatient && gender !== "female" ? back(2) : newPatient ? back(1) : null;
    if (currentStep === 16) {
      if (!newPatient && gender !== "female") return back(5);
      if (!newPatient) return back(3);
      if (!legal) return back(2);
    }

    // Default: go back 1 step
    back(1);
  };






  const handleSubmit = (e) => {

    e.preventDefault();

  };



  return (
    <Modal show={show} onHide={close} centered>

      <div className="modal-wrapper intake-Wrapper" style={{ position: "relative", width: "100%" }}>
        <AnimatedSlideWrapper direction={direction} currentKey={currentStep}>
          <div className="slide-container">

            <ModalHeader closeButton>
              {currentStep > 0 ? (
                <Button
                  variant="link"
                  className="p-0 text-decoration-none text-dark fw-bold"
                  onClick={() => {
                    if (selectedConsent !== null) {
                      setSelectedConsent(null); // Go back to list view inside Consent screen
                    } else {
                      goToPreviousSlide(); // Normal back
                    }
                  }}
                >
                  ← Back
                </Button>
              ) : (
                <div style={{ width: "75px" }} />
              )}
              <ModalTitle>
                <div className="intake-header">
                  <p className="m-0">{currentSlide.title}</p>
                </div>
              </ModalTitle>
            </ModalHeader>
            <div className="progress-bar-container" style={{ height: '4px', background: '#e0e0e0', width: '100%' }}>
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#007bff',
                  transition: 'width 0.4s ease-in-out',
                }}
              />
            </div>

            <ModalBody>
              <div className="intake-heading">
                {currentSlide.discriptionHeading && (

                  <h5>{currentSlide.discriptionHeading}</h5>

                )}
                {currentSlide.discriptionParagraph && (
                  <p>{currentSlide.discriptionParagraph}</p>
                )}
              </div>


              {typeof currentSlide.renderBody === "function" && (() => {
                if (currentSlide.id === "DiseaseSlide") {
                  return currentSlide.renderBody(medicalConditions, handleMedicalConditionChange);
                } else if (currentSlide.id === "ServiceSlide") {
                  return currentSlide.renderBody(desiredServices, handleServiceChange);
                } else if (currentSlide.id === "ConsentSlide") {
                  return currentSlide.renderBody(checkedItems, handleCheckboxChange);
                } else if (currentSlide.id === "HearAboutUsSlide") {
                  return currentSlide.renderBody(hearAboutUsAnswers, handleHearAboutUsChange);
                } else if (currentSlide.id === "DependentPatientSlide") {
                  return currentSlide.renderBody(key, setKey, checkedItems, handleCheckboxChange, goToNextSlide);
                } else {
                  return currentSlide.renderBody(goToNextSlide);
                }
              })()}
            </ModalBody>

            {typeof currentSlide.renderFooter === "function" && (
              <ModalFooter>
                {currentSlide.renderFooter(goToNextSlide, null, { setRegisteringFor })}
              </ModalFooter>
            )}

          </div>
        </AnimatedSlideWrapper>
      </div>

    </Modal>
  );
};

export default IntakeModal;