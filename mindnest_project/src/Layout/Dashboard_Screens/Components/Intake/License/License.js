import React, { useRef, useState } from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import {
  uploadDrivingLicenseApi,
  skipDrivingLicenseApi,
} from "../../../../../Api";
import drivingFrontSvg from "../../../../../assests/svgs/drivingfront.svg";
import drivingBackSvg from "../../../../../assests/svgs/drivingback.svg";
import InstructionModal from "../InstructionModal/InstructionModal"; // Make sure path is correct

const DrivingLicenseSlide = ({
  goToNextSlide,
  ringOne,
  ringTwo,
  ringThree,
  ringFour,
}) => {
  const { drivingLicense, setDrivingLicenseImage } = useIntakeStore();
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const isBothImagesUploaded = Boolean(
    drivingLicense.front && drivingLicense.back
  );

  const handleImageChange = (e, side) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setDrivingLicenseImage(side, base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSkip = async () => {
    const response = await skipDrivingLicenseApi();
    if (response.success) {
      goToNextSlide(6);
    } else {
      alert("An error occurred while skipping: " + response.message);
    }
  };

  const handleContinue = async () => {
    if (!drivingLicense.front || !drivingLicense.back) {
      alert("Please upload both front and back images.");
      return;
    }
    setLoading(true);
    const response = await uploadDrivingLicenseApi({
      drivingFrontImageHidden: drivingLicense.front,
      drivingBackImageHidden: drivingLicense.back,
    });
    setLoading(false);

    if (response.success) {
      goToNextSlide(6);
    } else {
      alert("Upload failed: " + response.message);
    }
  };

  return (
    <>
      <div className="modal-body-inner intake-modal intake-Driving">
        {/* FRONT IMAGE */}
        <div className="front-image-upload image-uplaod mb-3">
          <div className="image-heading">
            <h5>Front Side</h5>
            <div className="front-image dr-image-container">
              <img
                className="fr-image"
                src={drivingLicense.front || drivingFrontSvg}
                alt="Front Side"
              />
              <div className="front-border-image">
                <div className="ring-1">
                  <img src={ringOne} alt="" />
                </div>
                <div className="ring-2">
                  <img src={ringTwo} alt="" />
                </div>
              </div>
            </div>
            <div className="file-upload">
              <label htmlFor="DrivingFrontImage">Upload File</label>
              <input
                id="DrivingFrontImage"
                ref={frontInputRef}
                accept=".jpeg, .jpg, .png"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, "front")}
              />
              <span
                className="choose-btn"
                onClick={() => frontInputRef.current?.click()}
              >
                <span className="choose-bt">Choose</span>
              </span>
            </div>
          </div>
        </div>

        {/* BACK IMAGE */}
        <div className="back-image-upload image-uplaod mb-3">
          <div className="image-heading">
            <h5>Back Side</h5>
            <div className="back-image dr-image-container">
              <img
                className="fr-image"
                src={drivingLicense.back || drivingBackSvg}
                alt="Back Side"
              />
              <div className="back-border-image">
                <div className="ring-1">
                  <img src={ringThree} alt="" />
                </div>
                <div className="ring-2">
                  <img src={ringFour} alt="" />
                </div>
              </div>
            </div>
            <div className="file-upload">
              <label htmlFor="DrivingBackImage">Upload File</label>
              <input
                id="DrivingBackImage"
                ref={backInputRef}
                accept=".jpeg, .jpg, .png"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, "back")}
              />
              <span
                className="choose-btn"
                onClick={() => backInputRef.current?.click()}
              >
                <span className="choose-bt">Choose</span>
              </span>
            </div>
          </div>
        </div>

        {/* HELP LINK */}
        <div className="need-help d-flex align-items-center justify-content-center mt-1">
          <p className="m-0">
            Need help?{" "}
            <span>
              <button
                type="button"
                className="readInst"
                onClick={() => setShowInstructions(true)}
              >
                <b>Read instructions</b>
              </button>
            </span>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="modal-footer-inner text-center">
        <button
          type="button"
          className="btn-modal btn btn-primary"
          onClick={handleContinue}
          disabled={!isBothImagesUploaded || loading}
        >
          {loading ? "Uploading..." : "Continue"}
        </button>
        <div className="text-center">
          <button
            type="button"
            className="notApplicable mt-1"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
      </div>

      {/* CUSTOM BACKDROP TO DIM DRIVING LICENSE UI WHEN INSTRUCTION MODAL IS OPEN */}
      {showInstructions && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
          }}
        />
      )}

      {/* INSTRUCTION MODAL */}
      <InstructionModal
        show={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </>
  );
};

export default DrivingLicenseSlide;
