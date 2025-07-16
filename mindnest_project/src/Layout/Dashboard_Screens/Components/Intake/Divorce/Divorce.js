import React, { useRef, useState } from "react";
import useIntakeStore from "../../../../../Store/intakeStore";
import { uploadDivorceApi } from "../../../../../Api";
import drivingBackSvg from "../../../../../assests/svgs/drivingback.svg";

const DivorceSlide = ({ goToNextSlide, ringOne, ringTwo, ringThree, ringFour }) => {
  const [loading, setLoading] = useState(false);
  const { divorceImage, setDivorceImage } = useIntakeStore();
  const backInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setDivorceImage(base64String); // Save directly as string
    };

    reader.readAsDataURL(file);
  };

  const handleContinue = async () => {
  if (!divorceImage) {
    alert("Please upload the document");
    return;
  }

  setLoading(true);

  try {
    const response = await uploadDivorceApi(divorceImage); // ✅ send string directly

    setLoading(false);

    if (response.success) {
      goToNextSlide(5);
    } else {
      alert("Upload failed: " + response.message);
    }
  } catch (err) {
    setLoading(false);
    console.error(err);
    alert("Upload failed.");
  }
};


  return (
    <>
      <div className="modal-body-inner intake-modal intake-Driving">
        <div className="intake-heading">
          <h5>Upload divorce decree or child custody paperwork</h5>
        </div>

        <div className="front-image-upload image-uplaod mb-3">
          <div className="image-heading single-image-heading">
            <div className="front-image dr-image-container order-2">
              <img
                className="fr-image"
                src={divorceImage || drivingBackSvg}
                alt="Divorce Document"
              />
              <div className="front-border-image">
                <div className="ring-1"><img src={ringOne} alt="" /></div>
                <div className="ring-2"><img src={ringTwo} alt="" /></div>
              </div>
              <div className="back-border-image">
                <div className="ring-1"><img src={ringThree} alt="" /></div>
                <div className="ring-2"><img src={ringFour} alt="" /></div>
              </div>
            </div>

            <div className="file-upload">
              <label htmlFor="DivorceImage">Upload File</label>
              <input
                id="DivorceImage"
                ref={backInputRef}
                accept=".jpeg, .jpg, .png"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <span className="choose-btn" onClick={() => backInputRef.current?.click()}>
                <span className="choose-bt">Choose</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer-inner text-center">
        <button
          type="button"
          className="btn-modal btn btn-primary"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Continue"}
        </button>
      </div>
    </>
  );
};

export default DivorceSlide;
