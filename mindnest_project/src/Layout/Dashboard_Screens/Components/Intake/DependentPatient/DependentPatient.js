import React, { useState } from "react";
import { Form, Button, Tab, Tabs } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { gender, relationship, maritalStatus } from "../../../../../utils/options";
import "react-datepicker/dist/react-datepicker.css";
import { intakDependentPatientApi } from "../../../../../Api";
import CustomSelect from "../../../../../Plugins/Select2/CustomSelect";
import useIntakeStore from "../../../../../Store/intakeStore";

const DependentPatientForm = ({ goToNextSlide, setErrors, errors }) => {
  const { dependentPatientForm, setDependentPatientField } = useIntakeStore();
  const [tabKey, setTabKey] = useState("About-you");

  // Validate required fields on ABOUT YOU tab before moving forward
  const validateAboutYouFields = () => {
    const requiredFields = [
      "guardianFirstName",
      "guardianLastName",
      "guardianDob",
      "guardianGender",
      "relationship",
      "maritalStatus",
      "guardianAddress",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      // Special check for date fields (can be null)
      if (
        dependentPatientForm[field] === undefined ||
        dependentPatientForm[field] === null ||
        dependentPatientForm[field] === ""
      ) {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Handle tab switching with validation restrictions
  const handleTabSelect = (key) => {
    if (key === "About-them") {
      // Only allow moving to About Them if About You is valid
      const isValid = validateAboutYouFields();
      if (isValid) {
        setTabKey(key);
      } else {
        setTabKey("About-you"); // stay on About You if invalid
      }
    } else {
      // Allow moving back freely to About You
      setTabKey(key);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload for API
    const payload = {
      firstName: dependentPatientForm.dependentFirstName,
      lastName: dependentPatientForm.dependentLastName,
      dob:
        dependentPatientForm.dependentDob instanceof Date
          ? dependentPatientForm.dependentDob.toISOString()
          : null,
      gender: dependentPatientForm.dependentGender,
      fullAddress: dependentPatientForm.dependentAddress,
      address: dependentPatientForm.dependentAddress,
      state: "Texas",
      city: "Los Angeles",
      zipCode: "60836",
      guardianFirstName: dependentPatientForm.guardianFirstName,
      guardianLastName: dependentPatientForm.guardianLastName,
      guardianDOB:
        dependentPatientForm.guardianDob instanceof Date
          ? dependentPatientForm.guardianDob.toISOString()
          : null,
      guardianGender: dependentPatientForm.guardianGender,
      guardianFullAddress: dependentPatientForm.guardianAddress,
      guardianAddress: dependentPatientForm.guardianAddress,
      guardianState: "Texas",
      guardianCity: "Los Angeles",
      guardianZipCode: "29019",
      guardianRelationship: dependentPatientForm.relationship,
      guardianMaritalStatus: dependentPatientForm.maritalStatus,
      guardianReleaseInformation: dependentPatientForm.releaseInfo,
      guardianEmergencyContact: dependentPatientForm.emergencyContact,
    };

    try {
      const response = await intakDependentPatientApi(payload);

      if (response.success) {
        setErrors({});
        goToNextSlide(4);
      } else {
        // If backend returns an array of error messages, convert them to field-based errors
        if (Array.isArray(response.errors)) {
          // Mapping backend error messages to form fields by keywords
          const backendErrors = {};
          response.errors.forEach((msg) => {
            if (msg.toLowerCase().includes("first name")) {
              if (msg.toLowerCase().includes("guardian")) backendErrors.guardianFirstName = msg;
              else backendErrors.dependentFirstName = msg;
            } else if (msg.toLowerCase().includes("last name")) {
              if (msg.toLowerCase().includes("guardian")) backendErrors.guardianLastName = msg;
              else backendErrors.dependentLastName = msg;
            } else if (msg.toLowerCase().includes("dob")) {
              if (msg.toLowerCase().includes("guardian")) backendErrors.guardianDob = msg;
              else backendErrors.dependentDob = msg;
            } else if (msg.toLowerCase().includes("gender")) {
              if (msg.toLowerCase().includes("guardian")) backendErrors.guardianGender = msg;
              else backendErrors.dependentGender = msg;
            } else if (msg.toLowerCase().includes("address")) {
              if (msg.toLowerCase().includes("guardian")) backendErrors.guardianAddress = msg;
              else backendErrors.dependentAddress = msg;
            } else if (msg.toLowerCase().includes("relationship")) {
              backendErrors.relationship = msg;
            } else if (msg.toLowerCase().includes("marital status")) {
              backendErrors.maritalStatus = msg;
            } else {
              backendErrors.general = msg;
            }
          });
          setErrors(backendErrors);
        } else {
          setErrors({ general: response.message || "Submission failed" });
        }
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <Form className="frmcls" onSubmit={onSubmit}>
      {errors?.general && <div className="text-danger mb-2">{errors.general}</div>}

      <Tabs activeKey={tabKey} onSelect={handleTabSelect} fill unmountOnExit={false}>
        {/* ABOUT YOU TAB */}
        <Tab eventKey="About-you" title="ABOUT YOU">
          <div className="intake-heading">
            <h5>Tell us about yourself</h5>
          </div>

          {/* Guardian Info */}
          <Form.Group>
            <div className="row fspc">
              <div className="col-6 ps-0">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={dependentPatientForm.guardianFirstName || ""}
                  onChange={(e) => setDependentPatientField("guardianFirstName", e.target.value)}
                />
                {errors?.guardianFirstName && <div className="text-danger">{errors.guardianFirstName}</div>}
              </div>
              <div className="col-6 pe-0">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={dependentPatientForm.guardianLastName || ""}
                  onChange={(e) => setDependentPatientField("guardianLastName", e.target.value)}
                />
                {errors?.guardianLastName && <div className="text-danger">{errors.guardianLastName}</div>}
              </div>
            </div>
          </Form.Group>

          <Form.Group>
            <div className="row fspc">
              <div className="col-6 ps-0">
                <Form.Label>Date of Birth</Form.Label>
                <DatePicker
                  selected={dependentPatientForm.guardianDob}
                  onChange={(date) => setDependentPatientField("guardianDob", date)}
                  className="form-control"
                />
                {errors?.guardianDob && <div className="text-danger">{errors.guardianDob}</div>}
              </div>
              <div className="col-6 pe-0">
                <Form.Label>Gender</Form.Label>
                <CustomSelect
                  options={gender}
                  layout="dashboard"
                  value={gender.find((opt) => opt.value === dependentPatientForm.guardianGender) || null}
                  onChange={(e) => setDependentPatientField("guardianGender", e.value)}
                />
                {errors?.guardianGender && <div className="text-danger">{errors.guardianGender}</div>}
              </div>
            </div>
          </Form.Group>

          <Form.Group>
            <div className="row fspc">
              <div className="col-6 ps-0">
                <Form.Label>Relationship to Patient</Form.Label>
                <CustomSelect
                  options={relationship}
                  layout="dashboard"
                  value={relationship.find((opt) => opt.value === dependentPatientForm.relationship) || null}
                  onChange={(e) => setDependentPatientField("relationship", e.value)}
                />
                {errors?.relationship && <div className="text-danger">{errors.relationship}</div>}
              </div>
              <div className="col-6 pe-0">
                <Form.Label>Marital Status</Form.Label>
                <CustomSelect
                  options={maritalStatus}
                  layout="dashboard"
                  value={maritalStatus.find((opt) => opt.value === dependentPatientForm.maritalStatus) || null}
                  onChange={(e) => setDependentPatientField("maritalStatus", e.value)}
                />
                {errors?.maritalStatus && <div className="text-danger">{errors.maritalStatus}</div>}
              </div>
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={dependentPatientForm.guardianAddress || ""}
              onChange={(e) => setDependentPatientField("guardianAddress", e.target.value)}
            />
            {errors?.guardianAddress && <div className="text-danger">{errors.guardianAddress}</div>}
          </Form.Group>

          <Form.Group>
            <div className="checkboxes d-flex">
              <div className="form-check me-4 d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="releaseInfo"
                  checked={dependentPatientForm.releaseInfo || false}
                  onChange={() =>
                    setDependentPatientField("releaseInfo", !dependentPatientForm.releaseInfo)
                  }
                />
                <label className="form-check-label ms-2" htmlFor="releaseInfo">
                  List Release of Information
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="emergencyContact"
                  checked={dependentPatientForm.emergencyContact || false}
                  onChange={() =>
                    setDependentPatientField("emergencyContact", !dependentPatientForm.emergencyContact)
                  }
                />
                <label className="form-check-label ms-2" htmlFor="emergencyContact">
                  List Emergency Contact
                </label>
              </div>
            </div>
          </Form.Group>

          <div className="modal-footer-content text-center mt-3">
            <Button className="btn-modal btn btn-primary" onClick={() => handleTabSelect("About-them")}>
              Continue
            </Button>
          </div>
        </Tab>

        {/* ABOUT THEM TAB */}
        <Tab eventKey="About-them" title="ABOUT THEM">
          <div className="intake-heading">
            <h5>Tell us about your dependent</h5>
          </div>

          <Form.Group>
            <div className="row fspc">
              <div className="col-6 ps-0">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={dependentPatientForm.dependentFirstName || ""}
                  onChange={(e) => setDependentPatientField("dependentFirstName", e.target.value)}
                />
                {errors?.dependentFirstName && <div className="text-danger">{errors.dependentFirstName}</div>}
              </div>
              <div className="col-6 pe-0">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={dependentPatientForm.dependentLastName || ""}
                  onChange={(e) => setDependentPatientField("dependentLastName", e.target.value)}
                />
                {errors?.dependentLastName && <div className="text-danger">{errors.dependentLastName}</div>}
              </div>
            </div>
          </Form.Group>

          <Form.Group>
            <div className="row fspc">
              <div className="col-6 ps-0">
                <Form.Label>Date of Birth</Form.Label>
                <DatePicker
                  selected={dependentPatientForm.dependentDob}
                  onChange={(date) => setDependentPatientField("dependentDob", date)}
                  className="form-control"
                />
                {errors?.dependentDob && <div className="text-danger">{errors.dependentDob}</div>}
              </div>
              <div className="col-6 pe-0">
                <Form.Label>Gender</Form.Label>
                <CustomSelect
                  options={gender}
                  layout="dashboard"
                  value={gender.find((opt) => opt.value === dependentPatientForm.dependentGender) || null}
                  onChange={(e) => setDependentPatientField("dependentGender", e.value)}
                />
                {errors?.dependentGender && <div className="text-danger">{errors.dependentGender}</div>}
              </div>
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={dependentPatientForm.dependentAddress || ""}
              onChange={(e) => setDependentPatientField("dependentAddress", e.target.value)}
            />
            {errors?.dependentAddress && <div className="text-danger">{errors.dependentAddress}</div>}
          </Form.Group>

          <div className="modal-footer-content text-center mt-4">
            <Button className="btn-modal btn btn-primary" type="submit">
              Submit
            </Button>
          </div>
        </Tab>
      </Tabs>
    </Form>
  );
};

export default DependentPatientForm;
