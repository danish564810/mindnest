import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Button, Form, FormGroup } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
import DateTimePicker from "../../../../Plugins/DateTimePicker/DateTimePicker";
import CustomSelect from "../../../../Plugins/Select2/CustomSelect";
import "./Modal.css";

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

const slideContent = [
  {
    id: "PatientStatusSlide",
    title: "Onboard Intake",
    discriptionHeading: "Are you a new Patient?",
    discriptionParagraph: "You would be a new patient with us if you have not seen anyone in our group practice within the past 3 years.",
    renderBody: () => null,
    renderFooter: (goToNextSlide) => (
      <div className="btn-intake d-flex">
        <div className="btn-left">
          <button
            type="submit"
            className="btn-left-inner btn-modal"
            onClick={() => goToNextSlide(1)}
          >
            Yes
          </button>
        </div>
        <div className="btn-right">
          <button 
            type="submit"
            className="btn-right-inner"
            onClick={() => goToNextSlide(2)}
          >
            No
          </button>
        </div>
      </div>
    )
  },
  {
    id: "IntakeIndependentPatientForm",
    title: "Onboard Intake",
    discriptionHeading: "Tell us about yourself",
    renderBody: (handleSubmit, goToNextSlide) => (
      <Form className="frmcls" onSubmit={handleSubmit}>
        <div className="fcins">
          <Form.Group controlId="formName">
            <div className="name-fields row fspc">
              <div className="first-name fields col-6 ps-0">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text"/>
              </div>
              <div className="last-name fields col-6 pe-0">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text"/>
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="formBasicGender">
            <div className="dob-gender row fspc">
              <div className="user-dob fields col-6 ps-0">
                <Form.Label>Date of Birth</Form.Label>
                <DateTimePicker layout="dashboard" />
              </div>
              <div className="gender fields col-6 pe-0">
                <Form.Label>Gender</Form.Label>
                <CustomSelect options={gender} layout="dashboard" />
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <div className="user-address fspc">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" />
            </div>
          </Form.Group>
        </div>

        <div className="modal-footer-content text-center">
          <Button className="btn-modal" type="submit" onClick={() => goToNextSlide(3)}>
            Submit
          </Button>
        </div>
      </Form>
    ),
    renderFooter: () => null,
  },
  {
    id: "DependentPatientSlide",
    title: "Onboard Intake",
    renderBody: (key, setKey, checkedItems, handleCheckboxChange, goToNextSlide) => (
      <Form className="frmcls">
        <div className="fcins">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            fill
          >
            <Tab eventKey="About-you" title="ABOUT YOU">
              <div className="intake-heading">
                <h5>Tell us about yourself</h5>
              </div>
              <Form.Group controlId="formName">
                <div className="name-fields row fspc">
                  <div className="first-name fields col-6 ps-0">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" />
                  </div>
                  <div className="last-name fields col-6 pe-0">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" />
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="formBasicGender">
                <div className="dob-gender row fspc">
                  <div className="user-dob fields col-6 ps-0">
                    <Form.Label>Date of Birth</Form.Label>
                    <DateTimePicker layout="dashboard" />
                  </div>
                  <div className="gender fields col-6 pe-0">
                    <Form.Label>Gender</Form.Label>
                    <CustomSelect options={gender} layout="dashboard" />
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="formBasicGender">
                <div className="dob-gender row fspc">
                  <div className="user-dob fields col-6 ps-0">
                    <Form.Label>Relationship to Patient</Form.Label>
                    <CustomSelect options={relationship} layout="dashboard" />
                  </div>
                  <div className="gender fields col-6 pe-0">
                    <Form.Label>Marital Status</Form.Label>
                    <CustomSelect options={meritalStatus} layout="dashboard" />
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="formBasicAddress">
                <div className="user-address fspc">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" />
                </div>
              </Form.Group>
              <Form.Group controlId="formCheckboxes">
                <div className="checkboxes d-flex">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="releaseInfo"
                      name="releaseInfo"
                      checked={checkedItems.releaseInfo}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="releaseInfo">
                      List Release of Information
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="emergencyContact"
                      name="emergencyContact"
                      checked={checkedItems.emergencyContact}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="emergencyContact">
                      List Emergency Contact
                    </label>
                  </div>
                </div>
              </Form.Group>
            </Tab>
            <Tab eventKey="About-them" title="ABOUT THEM">
              <div className="intake-heading">
                <h5>Tell us about your dependent</h5>
              </div>
              <Form.Group controlId="formName">
                <div className="name-fields row fspc">
                  <div className="first-name fields col-6 ps-0">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" />
                  </div>
                  <div className="last-name fields col-6 pe-0">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" />
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="formBasicGender">
                <div className="dob-gender row fspc">
                  <div className="user-dob fields col-6 ps-0">
                    <Form.Label>Date of Birth</Form.Label>
                    <DateTimePicker layout="dashboard" />
                  </div>
                  <div className="gender fields col-6 pe-0">
                    <Form.Label>Gender</Form.Label>
                    <CustomSelect options={gender} layout="dashboard" />
                  </div>
                </div>
              </Form.Group>
              <Form.Group controlId="formBasicAddress">
                <div className="user-address fspc">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" />
                </div>
              </Form.Group>
            </Tab>
          </Tabs>
        </div>
        <div className="modal-footer-content text-center">
          <Button className="btn-modal" variant="primary" type="submit" onClick={() => goToNextSlide(3)}>
            Submit
          </Button>
        </div>
      </Form>
    ),
    renderFooter: () => null,
  },
  {
    id: 'DrivingImagesSlide',
    title: 'Upload Driving License',
    renderBody: () => <h1>hello</h1>,
    renderFooter: () => null,
  },
];

const IntakeModal = ({ show, close }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [key, setKey] = useState('About-you');
  const [animationClass, setAnimationClass] = useState('');
  const [checkedItems, setCheckedItems] = useState({
    releaseInfo: false,
    emergencyContact: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const goToNextSlide = (targetIndex) => {
    if (targetIndex === currentSlideIndex) return;
    
    // Determine animation direction
    const direction = targetIndex > currentSlideIndex ? 'slide-left' : 'slide-right';
    setAnimationClass(direction);
    
    setTimeout(() => {
      setCurrentSlideIndex(targetIndex);
      setAnimationClass('');
    }, 500); // Match this with CSS transition duration
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const currentSlide = slideContent[currentSlideIndex];

  return (
    <Modal
      show={show}
      onHide={close}
      centered
      dialogClassName="modal-dialog-centered"
    >
      <div className="modal-wrapper">
        <div className={`slide-container ${animationClass}`}>
          <div className="slide-content">
            <ModalHeader closeButton>
              <ModalTitle>
                <div className="intake-header">
                  <p className="m-0">{currentSlide.title}</p>
                </div>
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div className="modal-body-inner intake-modal">
                {currentSlide.discriptionHeading && (
                  <div className="intake-heading">
                    <h5>{currentSlide.discriptionHeading}</h5>
                  </div>
                )}
                {currentSlide.discriptionParagraph && <p>{currentSlide.discriptionParagraph}</p>}
              </div>

              {currentSlideIndex === 2
                ? currentSlide.renderBody(key, setKey, checkedItems, handleCheckboxChange, goToNextSlide)
                : currentSlide.renderBody(handleSubmit, goToNextSlide)}
            </ModalBody>
            {currentSlideIndex !== 1 && currentSlideIndex !== 2 && (
              <ModalFooter>
                {currentSlide.renderFooter(goToNextSlide)}
              </ModalFooter>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IntakeModal;