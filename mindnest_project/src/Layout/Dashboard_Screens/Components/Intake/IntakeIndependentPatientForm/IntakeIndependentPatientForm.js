import React, { useState, useEffect } from "react";
import { Form, Button, Tab, Tabs } from "react-bootstrap";
import { format } from "date-fns";
import DateTimePicker from "../../../../../Plugins/DateTimePicker/DateTimePicker";
import "react-datepicker/dist/react-datepicker.css";
import { intakeIndependentPatientApi } from "../../../../../Api";
import CustomSelect from "../../../../../Plugins/Select2/CustomSelect";
import useIntakeStore from "../../../../../Store/intakeStore";

const IntakeIndependentPatientForm = ({ goToNextSlide }) => {
  const today = new Date();
  const intakeIndependentPatientForm = useIntakeStore(
    (state) => state.intakeIndependentPatientForm
  );
  const setIntakeIndependentPatientField = useIntakeStore(
    (state) => state.setIntakeIndependentPatientField
  );
  const [errors, setErrors] = useState({});

  const getSafeForm = (form) => ({
    firstName: form.firstName || "",
    lastName: form.lastName || "",
    dob: form.dob || null,
    gender: form.gender || "",
    address: form.address || "",
    state: form.state || "",
    city: form.city || "",
    zipCode: form.zipCode || "",
  });

  const [localForm, setLocalForm] = useState(getSafeForm(intakeIndependentPatientForm));

  useEffect(() => {
    setLocalForm(getSafeForm(intakeIndependentPatientForm));
  }, [intakeIndependentPatientForm]);

  const handleChange = (field, value) => {
    setLocalForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      FirstName: localForm.firstName,
      LastName: localForm.lastName,
      DOB: localForm.dob ? format(new Date(localForm.dob), "MM/dd/yyyy") : "",
      Gender: localForm.gender,
      FullAddress: localForm.address,
      Address: localForm.address,
      State: localForm.state || "Texas",
      City: localForm.city || "Los Angeles",
      ZipCode: localForm.zipCode || "77584",
    };

    const response = await intakeIndependentPatientApi(formData);

    if (response.success) {
      setErrors({});
      setIntakeIndependentPatientField(localForm);
      goToNextSlide();
    } else {
      const fieldErrors = {};
      response.errors?.forEach((msg) => {
        const lower = msg.toLowerCase();
        if (lower.includes("first name")) fieldErrors.firstName = msg;
        else if (lower.includes("last name")) fieldErrors.lastName = msg;
        else if (lower.includes("dob")) fieldErrors.dob = msg;
        else if (lower.includes("gender")) fieldErrors.gender = msg;
        else if (lower.includes("address")) fieldErrors.address = msg;
      });
      setErrors(fieldErrors);
    }
  };

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <Form className="frmcls" onSubmit={handleSubmit}>
      <div className="fcins">
        <Form.Group controlId="formName">
          <div className="name-fields row fspc">
            <div className="first-name fields col-6 ps-0">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={localForm.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                isInvalid={!!errors.firstName}
              />
              {errors.firstName && (
                <div className="text-danger">{errors.firstName}</div>
              )}
            </div>
            <div className="last-name fields col-6 pe-0">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={localForm.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                isInvalid={!!errors.lastName}
              />
              {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )}
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <div className="dob-gender row fspc">
            <div className="user-dob fields col-6 ps-0">
              <Form.Label>Date of Birth</Form.Label>
              <DateTimePicker
                layout="dashboard"
                selected={localForm.dob}
                onChange={(date) => handleChange("dob", date)}
                format="MM/DD/YYYY"
                minDate={new Date("1900-01-01")}
                maxDate={today}
              />
              {errors.dob && <div className="text-danger">{errors.dob}</div>}
            </div>
            <div className="gender fields col-6 pe-0">
              <Form.Label>Gender</Form.Label>
              <CustomSelect
                options={genderOptions}
                layout="dashboard"
                value={genderOptions.find((opt) => opt.value === localForm.gender)}
                onChange={(e) => handleChange("gender", e.value)}
              />
              {errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <div className="user-address fspc">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={localForm.address}
              onChange={(e) => handleChange("address", e.target.value)}
              isInvalid={!!errors.address}
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </div>
        </Form.Group>
      </div>

      <div className="modal-footer-content text-center">
        <Button className="btn-modal" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default IntakeIndependentPatientForm;
