import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

// Cookie adapter
const cookieStorage = {
  getItem: (name) => {
    const value = Cookies.get(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    Cookies.set(name, JSON.stringify(value), { expires: 7 });
  },
  removeItem: (name) => {
    Cookies.remove(name);
  },
};

const illnesses = [
  "adhd/add", "alzheimer's", "anxiety", "bipolar", "depression", "heart disease",
  "schizophrenia", "seizures", "stroke", "substance abuse", "suicide attempts"
];

const relatives = [
  "father", "mother", "aunt", "uncle", "brother", "sister", "children", "grandChildren"
];

const defaultFamilyHistory = illnesses.map((illness) => {
  const obj = { illness };
  relatives.forEach((rel) => (obj[rel] = false));
  return obj;
});

const useIntakeStore = create(

  (set) => ({
    // Independent Patient
    intakeIndependentPatientForm: {
      firstName: '',
      lastName: '',
      dob: null,
      gender: '',
      address: '',
      state: '',
      city: '',
      zipCode: '',
    },
    setIntakeIndependentPatientField: (newFields) =>
      set((state) => ({
        intakeIndependentPatientForm: {
          ...state.intakeIndependentPatientForm,
          ...newFields,
        },
      })),

    // Dependent Patient
    dependentPatientForm: {
      dependentFirstName: "",
      dependentLastName: "",
      dependentDob: null,
      dependentGender: "",
      dependentAddress: "",
      dependentState: "",
      dependentCity: "",
      dependentZipCode: "",
      guardianFirstName: "",
      guardianLastName: "",
      guardianDob: null,
      guardianGender: "",
      guardianAddress: "",
      guardianState: "",
      guardianCity: "",
      guardianZipCode: "",
      relationship: "",
      maritalStatus: "",
      releaseInfo: false,
      emergencyContact: false,
    },
    setDependentPatientField: (field, value) =>
      set((state) => ({
        dependentPatientForm: {
          ...state.dependentPatientForm,
          [field]: value,
        },
      })),

    // Driving License
    drivingLicense: {
      front: "",
      back: "",
    },
    setDrivingLicenseImage: (side, base64) =>
      set((state) => ({
        drivingLicense: {
          ...state.drivingLicense,
          [side]: base64,
        },
      })),
    resetDrivingLicense: () => set({ drivingLicense: { front: "", back: "" } }),

    //divorce 
    // Divorce Image (single image)
    divorceImage: "",

    setDivorceImage: (base64) => set(() => ({
      divorceImage: base64,
    })),

    resetDivorceImage: () => set({ divorceImage: "" }),

    // Pharmacy
    selectedPharmacy: null,
    setSelectedPharmacy: (pharmacy) => set({ selectedPharmacy: pharmacy }),
    //alergies
    allergies: [],
    setAllergies: (items) => set({ allergies: items }),
    // Medications
    medications: [],
    setMedications: (meds) => set({ medications: meds }),

    // Social History
    socialHistory: "",
    setSocialHistory: (text) => set({ socialHistory: text }),

    // Legal Matter
    legalMatterText: "",
    setLegalMatterText: (text) => set({ legalMatterText: text }),

    // Schizophrenia
    schizophreniaPsychosisDetected: null,
    setSchizophreniaPsychosisDetected: (value) =>
      set({ schizophreniaPsychosisDetected: value }),

    // Suicide Attempt
    suicide: null,
    setSuicide: (value) => set({ suicide: value }),

    // Family History
    familyHistory: defaultFamilyHistory,
    setFamilyHistory: (data) => set({ familyHistory: data }),

    updateFamilyHistory: (illnessIndex, relative) =>
      set((state) => {
        const updated = [...state.familyHistory];
        updated[illnessIndex] = {
          ...updated[illnessIndex],
          [relative]: !updated[illnessIndex][relative],
        };
        return { familyHistory: updated };
      }),
    illnesses,
    relatives,

    // Alcohol & Smoking
    alcohol: 0,
    smoking: 0,
    setAlcohol: (value) => set({ alcohol: value }),
    setSmoking: (value) => set({ smoking: value }),

    // Medical Conditions
    medicalConditions: {
      SeizuresDisease: false,
      Lqt: false,
      LD: false,
      KD: false,
    },
    setMedicalCondition: (id, value) =>
      set((state) => ({
        medicalConditions: {
          ...state.medicalConditions,
          [id]: value,
        },
      })),

    // Intake Services
    intakeServices: {
      Anxiety: false,
      Depression: false,
      Insomnia: false,
      Bipolar: false,
      Psychosis: false,
      Schizophrenia: false,
    },
    setIntakeServices: (id, value) =>
      set((state) => ({
        intakeServices: {
          ...state.intakeServices,
          [id]: value,
        },
      })),

    // How did you hear about us?
    
    hearAboutUsAnswers: {
      Internet: false,
      Google: false,
      Yelp: false,
      Facebook: false,
      Family: false,
      Other: false,
    },
    setHearAboutUsAnswer: (id, value) =>
      set((state) => ({
        hearAboutUsAnswers: {
          ...state.hearAboutUsAnswers,
          [id]: value,
        },
      })),
    otherAboutUsText: "",
    setOtherAboutUsText: (text) => set({ otherAboutUsText: text }),

    // Consents
    consents: [],
    setConsents: (consents) => set({ consents }),
    selectedConsent: null,
    setSelectedConsent: (consent) => set({ selectedConsent: consent }),
    // UI Flow State
    currentStep: 0,
    slideHistory: [],
    showParentSection: true,
    showDependentSection: true,
    items: [],
    setItems: (items) => set({ items }),

    pastItems: [],
    setPastItems: (pastItems) => set({ pastItems }),
    setSlideHistory: (history) => set({ slideHistory: history }),
    setCurrentStep: (step) => set({ currentStep: step }),
    setShowParentSection: (value) => set({ showParentSection: value }),
    setShowDependentSection: (value) => set({ showDependentSection: value }),
    // ✅ New: Full intake data from API
    intakeData: null,
    setIntakeData: (data) => set({ intakeData: data }),

    // ✅ Optional: Reset function
    resetIntakeData: () => set({ intakeData: null }),


  }),
  {
    name: "intake-storage",
    getStorage: () => cookieStorage,
  }

);

export default useIntakeStore;
