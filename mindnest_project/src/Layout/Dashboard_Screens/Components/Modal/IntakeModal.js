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
import { intakDependentPatientApi, intakePatientStatusApi, uploadDivorceApi } from "../../../../Api";
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
import { intakePregnancyStatusApi } from "../../../../Api";
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
 //intake slide 3 (index 2) //dependant and independant slide 
       
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
// intake slide 4(index 3) Divorce License
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
       // intake slide 5(index 4) Driving License
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
      // intake slide 6(index 5) medication prescribe 
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
                    goToNextSlide();
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
                    goToNextSlide();
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
       // intake slide 7(index 6) Current Mediction
      {
        id: "IntakeCurrentMedicationForm",
        title: "Onboard Intake",
        renderBody: (goToNextSlide) => (
          <CurrentMedicationSlide goToNextSlide={goToNextSlide} />
        ),
      },

      // intake slide 8(index 7) Pharmacies
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
     // intake slide 9(index 8) allergies
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
                  goToNextSlide();
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


      // intake slide 10(index 9) social history
      {
        id: "SocialHistorySlide",
        title: "Onboarding Intake",
        renderBody: (goToNextSlide) => (
          <SocialHistorySlide goToNextSlide={goToNextSlide} />
        ),
      },
      // intake slide 11(index 10) Family history
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
      // intake slide 12(index 11) Hospitalization
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
                  goToNextSlide();
                  console.log("Submitted all hospitalizations:", hospitalizationValue, res);
                  
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

      // intake slide 13(index 12) Smoking and Alcohal
      {
        id: "AlcoholSmokingSlide",
        title: "Onboarding Intake",
        renderBody: () => <AlcoholSmokingForm />,
        renderFooter: (goToNextSlide) => <SmokingAlcoholFooter goToNextSlide={goToNextSlide} />,
      },
      
      //intake slide 14 (index 13) pregnancy
      {
        id: 'pregnancySlide',
        title:'Onboarding Intake',
         renderBody: () => (
          <>
          <div className="modal-body-inner intake-modal">
              <div className="intake-heading">
                <h5>Are you currently pregnant or is there a chance you could be?</h5>
              </div>
            </div>
          </>
         ),
         renderFooter: (goToNextSlide) => {
          const handlePregnency = async (isPregnant) => {
            try {
              await intakePregnancyStatusApi(isPregnant);
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
                  onClick={() => handlePregnency(true)}
                >
                  Yes
                </button>
              </div>
              <div className="btn-right">
                <button
                  type="button"
                  className="btn-right-inner"
                  onClick={() => handlePregnency(false)}
                >
                  No
                </button>
              </div>
            </div>
          );
        }

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
              await PatientLegalMatterStatus(isLegalMatter);
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
      // intake slide 16(index 13) Legal matter discription
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

  const fetchAndSetIntakeData = async () => {
    try {
      const result = await fetchIntakeTaskView();
      if (!result.success) return;

      const data = result.data ?? {};
      console.log("Fetched intake data:", data);

      setIntakeData(data);

      const newFormData = {};

      // -------------------- 0 - Patient Status --------------------
      newFormData.newPatient = data.patientStatus?.patientStatus ?? '';

      // -------------------- 1 - Registering Myself or Someone Else --------------------
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

      if (data.depIndepStatus === "Dependent") {
        setShowParentSection(true);
        setShowDependentSection(true);
        setRegisteringFor("someone_else");

        newFormData.myself = false;
        newFormData.dependent = true;

        const g = data.dependentPatient ?? {};

        // Guardian fields
        newFormData.firstName = g.guardianFirstName ?? '';
        newFormData.lastName = g.guardianLastName ?? '';
        newFormData.dob = g.guardianDOB ?? null;
        newFormData.gender = g.guardianGender ?? '';
        newFormData.address = g.guardianAddress ?? '';
        newFormData.state = g.guardianState ?? '';
        newFormData.city = g.guardianCity ?? '';
        newFormData.zip = g.guardianZipCode ?? '';
        newFormData.relationship = g.guardianRelationship ?? '';
        newFormData.maritalStatus = g.guardianMaritalStatus ?? '';
        newFormData.releaseOfInformation = g.guardianReleaseInformation ?? false;
        newFormData.emergencyContact = g.guardianEmergencyContact ?? false;

        // Dependent fields
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

      // -------------------- 3 - Divorce License --------------------
      newFormData.divorceImageContent = data?.divorced?.divorceHidden ?? null;

      // -------------------- 4 - Driving License --------------------
      newFormData.drivingFront = data?.drivingLicense?.front ?? null;
      newFormData.drivingBack = data?.drivingLicense?.back ?? null;

      // -------------------- 5 - Medication Prescribe --------------------
      newFormData.medicationPrescribed = data?.medicationPrescribeVM?.patientStatus ?? false;

      // -------------------- 6 - Current Medication --------------------
      newFormData.currentMedication = data?.currentMedication ?? [];

      // -------------------- 7 - Pharmacy --------------------
      newFormData.selectedPharmacy = data?.pharmacy ?? null;

      // -------------------- 8 - Allergies --------------------
      newFormData.allergies = data?.allergies ?? [];

      // -------------------- 9 - Social History --------------------
      newFormData.socialHistory = data?.socialHistory ?? {};

      // -------------------- 10 - Family History --------------------
      newFormData.familyHistory = data?.familyHistory ?? {};

      // -------------------- 11 - Hospitalization --------------------
      newFormData.hospitalizations = data?.hospitalization ?? [];

      // -------------------- 12 - Alcohol & Smoking --------------------
      newFormData.alcoholSmoking = data?.alcoholSmoking ?? {};

      // -------------------- 13 - Pregnancy --------------------
      newFormData.pregnancy = data?.pregencyVM?.pregency ?? '';

      // -------------------- 14 - Legal Issue --------------------
      newFormData.legalIssue = data?.legalVM?.legal ?? '';
      setLegalMatterText(data?.legalVM?.legal ?? '');

      // -------------------- 15 - Legal Matter Description --------------------
      newFormData.legalDescription = data?.legalVM?.description ?? '';
      setErrors(data?.legalVM?.errors ?? []);

      // -------------------- 16 - Diseases --------------------
      newFormData.diseases = data?.diseases ?? [];

      // -------------------- 17 - Schizophrenia / Psychosis --------------------
      newFormData.schizophrenia = data?.schizophreniaPsychosisDetected ?? false;

      // -------------------- 18 - Suicide Attempt --------------------
      newFormData.suicideAttempt = data?.suicideAttempt ?? false;

      // -------------------- 19 - Services --------------------
      newFormData.services = data?.services ?? [];

      // -------------------- 20 - Hear About Us --------------------
      newFormData.hearAboutUs = data?.hearAboutUs ?? '';

      // -------------------- 21 - Consents --------------------
      newFormData.consents = data?.tempConsents ?? [];

      // Merge into state
      setFormData(prev => ({ ...prev, ...newFormData }));

      // -------------------- Step Mapping --------------------
      const stepMap = {
        PatientStatusSlide: 0,
        YourselfOtherSlide: 1,
        PatientFormSlide: 2,
        DivorceImageSlide: 3,
        DrivingImagesSlide: 4,
        MedicationPrescribedSlide: 5,
        IntakeCurrentMedicationForm: 6,
        PharmacySlide: 7,
        AllergiesSlide: 8,
        SocialHistorySlide: 9,
        FamilyHistorySlide: 10,
        HospitalizationHistorySlide: 11,
        AlcoholSmokingSlide: 12,
        pregnancySlide: 13,
        LegalIssueSlide: 14,
        LegalMatterSlide: 15,
        DiseaseSlide: 16,
        SchizophreniaPsychosisDetectedSlide: 17,
        SuicideAttemptSlide: 18,
        ServiceSlide: 19,
        HearAboutUsSlide: 20,
        ConsentsSlide: 21,
      };

      const lastStep = stepMap[data.registrationIntakeStatus] ?? 0;
      setCurrentStep(lastStep);

    } catch (err) {
      console.error("Intake fetch error:", err);
    }
  };

  fetchAndSetIntakeData();
}, [
  user,
  setFormData,
  setCurrentStep,
  setShowParentSection,
  setShowDependentSection,
  setIntakeData,
  setDependentPatientField,
  setIntakeIndependentPatientField,
  setLegalMatterText,
  setErrors
]);

//handle next 



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

 // -------------------- Go to Next Slide (with exact manager logic) --------------------
const goToNextSlide = () => {
  const {
    dependent,
    newPatient,
    gender,
    showLocalPharmacy,
    legal,
    maritalStatus,
  } = formData;

  const maxStep = slideContent.length - 1;
  let nextStep = currentStep + 1;

  switch (currentStep) {
    case 2:
      nextStep = dependent && maritalStatus?.toLowerCase() === "divorced" ? 3 : 4;
      break;
    case 5:
      nextStep = newPatient
        ? showLocalPharmacy
          ? 7
          : 8
        : showLocalPharmacy
        ? 8
        : 7;
      break;
    case 6:
      nextStep = newPatient ? 7 : 8;
      break;
    case 8:
      nextStep = newPatient ? 9 : 11;
      break;
    case 11:
      nextStep = newPatient ? 12 : gender === "female" ? 13 : 16;
      break;
    case 12:
      nextStep = gender === "female" ? 13 : 14;
      break;
    case 13:
      nextStep = newPatient ? 14 : 16;
      break;
    case 14:
      if (!legal) nextStep = 16;
      break;
    case 21:
      return; // last step, do nothing
  }

  if (nextStep > maxStep) nextStep = maxStep;

  setDirection("forward");
  setCurrentStep(nextStep);
};

// -------------------- Go to Previous Slide (with exact manager logic) --------------------
const goToPreviousSlide = () => {
  const {
    dependent,
    newPatient,
    gender,
    showLocalPharmacy,
    legal,
    maritalStatus,
  } = formData;

  const back = (n = 1) => setCurrentStep(Math.max(currentStep - n, 0));

  switch (currentStep) {
    case 3:
      setShowParentSection(true);
      setShowDependentSection(false);
      return setCurrentStep(2);

    case 4:
      if (dependent && maritalStatus?.toLowerCase() === "divorced") {
        setShowParentSection(false);
        setShowDependentSection(true);
        return setCurrentStep(3);
      } else {
        setShowParentSection(true);
        setShowDependentSection(false);
        return setCurrentStep(2);
      }

    case 7:
      return back(newPatient ? 1 : 2);

    case 8:
      return back(newPatient ? 1 : showLocalPharmacy ? 3 : 2);

    case 11:
      if (!newPatient) return back(3);
      break;

    case 12:
      if (newPatient) return back(1);
      break;

    case 13:
      return back(newPatient ? 1 : 2);

    case 14:
      return newPatient && gender !== "female" ? back(2) : back(1);

    case 16:
      if (!newPatient && gender !== "female") return back(5);
      if (!newPatient) return back(3);
      if (!legal) return back(2);
      break;

    default:
      back(1);
  }
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