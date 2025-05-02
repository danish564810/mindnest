import react from "react";
import Header from "../../Components/dashboard_header/header";
import Sidebar from "../../Components/Sidebar/sidebar";
import Card from "../../Components/Card/card";
import TabbedCard from "../../Components/TabbedCard/TabbedCard";
import Tables from "../../Components/Tabels/tables";
import mobVector from "../../../../assests/images/patientVectoeBackground.png";
import webVector from "../../../../assests/images/billing-vector.png";
import verificationImage from "../../../../assests/svgs/verificationProfile.svg";
import masterCard from "../../../../assests/images/Master Card.png";
import checkboxChecked from "../../../../assests/svgs/checkbox-checked.svg";
import checkboxUnChecked from "../../../../assests/svgs/checkbox-unchecked.svg";
const PatientProfile = () => {
  return (
    <>
      <Header />
      <div className="main">
        <Sidebar />
        <div className="side-content">
          <div className="profile-inner scrol-inner">
            <div className="user-profile-background">
              <div className="background-image">
                <img
                  className="mobile-vector"
                  src={mobVector}
                  alt="mobVector"
                />
                <img className="mobile-web" src={webVector} alt="mobVector" />
              </div>
              <div className="profile-inner-main-section">
                <div className="user-profile-background-inner">
                  <div className="user-profile-detail-inner d-flex">
                    <div className="col-12 d-flex">
                      <div className="profile-pic image-border">
                        <label className="-label" for="ProfilePic">
                          <span className="glyphicon glyphicon-camera"></span>
                          <span>Change Image</span>
                        </label>
                        <input
                          id="ProfilePic"
                          name="ProfilePic"
                          type="file"
                          accept="image/x-png, image/gif, image/jpeg"
                        ></input>
                        <img
                          src=""
                          className="user-image-container fn-ProfilePic"
                          id="ProfilePicPreview"
                        ></img>
                      </div>
                      <div className="patient-detail-main">
                        <div
                          className="patient-detail-inner d-flex flex-column"
                          id="patient-profile-details"
                        >
                          <div className="patient-name-age d-flex flex-column">
                            <div className="patient-name d-flex">
                              <h5 className="user-name">
                                {" "}
                                <span className="user-first-name mr-1">
                                  Ehtisham
                                </span>
                                <span className="user-last-name">Haq</span>
                              </h5>
                              <div className="verified_profile">
                                <img
                                  src={verificationImage}
                                  alt="verification batch"
                                />
                              </div>
                            </div>
                            <div className="patient-age">
                              <h5 className="user-age profle-fields">
                                Male 45 y.o
                              </h5>
                            </div>
                          </div>
                          <div className="patient-dertail-description d-flex flex-wrap">
                            <div className="patient-email-main spac-bet d-flex flex-column">
                              <p className="email-tittle">E-mail Address</p>
                              <h5 className="patient-email profle-fields">
                                abdulrauf.158.tuf+pt@gmail.com
                              </h5>
                              <div className="fn-email-confirmation-section"></div>
                            </div>
                            <div className="patient-phoneNumber-main spac-bet d-flex flex-column">
                              <p className="phone-tittle">Phone Number</p>
                              <h5
                                id="PProfilePhoneNumber"
                                className="patient-phone profle-fields"
                              >
                                (205) 612-1212
                              </h5>
                              <div className="fn-phone-confirmation-section mb-2"></div>
                            </div>
                            <div className="DateOFBirth-main spac-bet d-flex flex-column">
                              <p className="DateOFBirth-tittle">
                                Date of Birth
                              </p>
                              <h5 className="DateOFBirth-patient profle-fields">
                                04/04/1980
                              </h5>
                            </div>
                            <div className="timeZone-main spac-bet d-flex flex-column">
                              <p className="timeZone-tittle">Timezone</p>
                              <h5 className="timezone profle-fields">
                                (UTC-06:00) Central Time (US &amp; Canada)
                              </h5>
                            </div>
                            <div className="personal-address spac-bet d-flex flex-column">
                              <p>Home Address</p>
                              <h5 className="User-address profle-fields">
                                104 Whispering Pines Avenue, Friendswood, Texas,
                                77546
                              </h5>
                            </div>
                            <div className="city-main spac-bet d-flex flex-column">
                              <p className="city-tittle">City</p>
                              <h5 className="city-usr profle-fields">
                                Friendswood
                              </h5>
                            </div>
                            <div className="state-main spac-bet d-flex flex-column">
                              <p className="state-tittle">State</p>
                              <h5 className="state-usr profle-fields">Texas</h5>
                            </div>
                            <div className="zip-main spac-bet d-flex flex-column">
                              <p className="zipcode-tittle">Zip code</p>
                              <h5 className="zipcode-usr profle-fields fn-patient-zipcode">
                                77546
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-profile-subscription-method">
            <div className="patient-profile-subscription-method-inner d-flex">
              <div className="col-xl-4 col-lg-6 col-md-12 patient-do-dis">
                <div className="subscription-card-main">
                  <div className="subscription-card-main-inner d-flex flex-column">
                    <Card
                      title="Family Members"
                      bodyContent={
                        <>
                          <ul className="family-list list">
                            <li className="family-items fn-family-items list-items">
                              <div className="family-item-inner justify-content-between align-items-center d-flex">
                                <div className="image-name-container d-flex align-items-center">
                                  <div className="cardimage-container">
                                    <span className="defaultinitials">EH</span>
                                  </div>
                                  <div className="family-member-details">
                                    <div className="det-in d-flex align-items-center">
                                      <h5 className="familyMemberName fn-family-member-name m-0 d-flex align-items-center">
                                        Ehtishamm Haqq{" "}
                                        <span className="varified">
                                          <img
                                            src={verificationImage}
                                            alt="verification batch"
                                          />
                                        </span>{" "}
                                      </h5>
                                      <span className="badge badge-status status">
                                        Manager
                                      </span>
                                    </div>
                                    <div className="memberAge">
                                      <h5 className="user-age profle-fields mb-0">
                                        {" "}
                                        <span className="user-gender text-capitalize">
                                          male
                                        </span>{" "}
                                        45 y.o
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </>
                      }
                    >
                      <div className="edit-fields pay-btn">
                        <button
                          className="payment-edit ed-bt"
                          id="add-memberBtn"
                        >
                          add
                        </button>
                      </div>
                      <div className="total-member">3 Member(s)</div>
                    </Card>
                    <Card
                      title="Emergency & Information Sharing"
                      bodyContent={
                        <>
                          <div className="contacts-details d-flex flex-wrap">
                            <div className="contact-name d-flex flex-column spac-bet desktop-spec">
                              <p className="mb-0">Name</p>
                              <h5 className="mb-0 EmergencyContentName profle-fields">
                                emergency first
                              </h5>
                            </div>
                            <div className="contact-relation d-flex flex-column spac-bet desktop-spec">
                              <p className="mb-0">Relation</p>
                              <h5 className="mb-0 EmergencyContentRelation profle-fields text-capitalize">
                                father
                              </h5>
                            </div>
                            <div className="contact-email d-flex flex-column spac-bet desktop-spec">
                              <p className="mb-0"> E-mail Address </p>
                              <h5 className="mb-0 EmergencyContentEmail profle-fields">
                                N/A
                              </h5>
                            </div>
                            <div className="contact-phone d-flex flex-column spac-bet desktop-spec">
                              <p className="mb-0"> Phone Number</p>
                              <h5 className="mb-0 EmergencyContentPhone profle-fields">
                                (202) 584-6511
                              </h5>
                            </div>
                            <div className="emegency-checkbox d-flex w-100">
                              <div className="typeOfContct d-flex align-items-center pe-3">
                                <div className="checkbox-img-container">
                                  <img
                                    src={checkboxChecked}
                                    alt="Emergency Checkbox"
                                  />
                                </div>
                                <h5 className="mb-0 profle-fields">
                                  Emergency
                                </h5>
                              </div>
                              <div className="typeOfContct d-flex align-items-center">
                                <div className="checkbox-img-container">
                                  <img
                                    src={checkboxUnChecked}
                                    alt="Release Information Checkbox"
                                  />
                                </div>
                                <h5 className="mb-0 profle-fields">
                                  Release of Information
                                </h5>
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    >
                      <div className="edit-fields pay-btn">
                        <button
                          className="payment-edit ed-bt"
                          id="add-memberBtn"
                        >
                          add
                        </button>
                      </div>
                      <div className="total-member">2 Contact(s)</div>
                    </Card>
                    <TabbedCard
                      title="Family Member Info"
                      tabs={[
                        {
                          key: "Default Pharmacy",
                          label: "Default Pharmacy",
                          content: (
                            <div className="def-container fn-phamrmacy-container">
                              <h5>Genoa Healthcare</h5>
                              <p>
                                9009 N Loop E Fwy Suite 270, Houston, TX, 77029
                              </p>
                              <div className="edit-pahr-fields">
                                <button
                                  type="button"
                                  data-type="profile"
                                  className="ed-bt fn-pharmecy-sec"
                                  data-id="8453"
                                >
                                  edit
                                </button>
                              </div>
                            </div>
                          ),
                        },
                        {
                          key: "Default Office",
                          label: "Default Office",
                          content: (
                            <div className="def-container fn-phamrmacy-container">
                              <h5>Virtual Clinic</h5>
                              <p>
                              104 Whispering Pine Ave, Friendswood, Texas, 77546
                              </p>
                              <div className="edit-pahr-fields">
                                <button
                                  type="button"
                                  data-type="profile"
                                  className="ed-bt fn-pharmecy-sec"
                                  data-id="8453"
                                >
                                  edit
                                </button>
                              </div>
                            </div>
                          ),
                        },
                      ]}
                    />
                    <Card
                      title="Notifications"
                      bodyContent={
                        <>
                          <div className="contacts-details d-flex flex-wrap">
                            <div className="contact-name d-flex flex-column spac-bet desktop-spec">
                              <p className="mb-0">Name</p>
                              <h5 className="mb-0 EmergencyContentName profle-fields">
                                emergency first
                              </h5>
                            </div>
                            <div className="contact-relation d-flex flex-column spac-bet desktop-spec">
                              <p className="mb-0">Relation</p>
                              <h5 className="mb-0 EmergencyContentRelation profle-fields text-capitalize">
                                father
                              </h5>
                            </div>
                            <div className="contact-email d-flex flex-column spac-bet desktop-spec">
                              <p className="mb-0"> E-mail Address </p>
                              <h5 className="mb-0 EmergencyContentEmail profle-fields">
                                N/A
                              </h5>
                            </div>
                            <div className="contact-phone d-flex flex-column spac-bet desktop-spec">
                              <p className="mb-0"> Phone Number</p>
                              <h5 className="mb-0 EmergencyContentPhone profle-fields">
                                (202) 584-6511
                              </h5>
                            </div>
                            <div className="emegency-checkbox d-flex w-100">
                              <div className="typeOfContct d-flex align-items-center pe-3">
                                <div className="checkbox-img-container">
                                  <img
                                    src={checkboxChecked}
                                    alt="Emergency Checkbox"
                                  />
                                </div>
                                <h5 className="mb-0 profle-fields">
                                  Emergency
                                </h5>
                              </div>
                              <div className="typeOfContct d-flex align-items-center">
                                <div className="checkbox-img-container">
                                  <img
                                    src={checkboxUnChecked}
                                    alt="Release Information Checkbox"
                                  />
                                </div>
                                <h5 className="mb-0 profle-fields">
                                  Release of Information
                                </h5>
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    >
                      <div className="edit-fields pay-btn">
                        <button
                          className="payment-edit ed-bt"
                          id="add-memberBtn"
                        >
                          add
                        </button>
                      </div>
                      <div className="total-member">2 Contact(s)</div>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-6 col-md-12">
                <TabbedCard
                  title="Family Member Info"
                  tabs={[
                    {
                      key: "subscription",
                      label: "Subscription",
                      content: (
                        <div className="subscription-detail-main d-flex flex-column">
                          <div className="subscription-detail-main-inner d-flex flex-wrap">
                            <div className="sb-mai-inn">
                              <div className="subscription-plans-main d-flex mb-4">
                                <div className="current-plan subscrip-marg d-flex flex-column">
                                  <p>Current Plan</p>
                                  <h6>Medication + Therapy </h6>
                                  <h6>$340 per month</h6>
                                </div>
                                <div className="Previos-Payment subscrip-marg d-flex flex-column">
                                  <p>Previous Payment</p>
                                  <h6>
                                    <span>04/11/2025</span>
                                  </h6>
                                </div>
                                <div className="Payment-Method subscrip-marg d-flex flex-column">
                                  <p>Payment Method</p>
                                  <h6>Visa ***3719</h6>
                                </div>
                                <div className="Subscription-Cycle subscrip-marg d-flex flex-column">
                                  <p>Subscription Cycle</p>
                                  <h6>
                                    <span>18 days.</span>
                                  </h6>
                                </div>
                                <div className="Next-Payment subscrip-marg d-flex flex-column">
                                  <p>Next Payment</p>
                                  <h6>
                                    <span>05/11/2025</span>
                                  </h6>
                                </div>
                              </div>
                              <div className="transection-secure">
                                <p className="mb-0">
                                  All transactions are secure and encrypted.{" "}
                                </p>
                              </div>
                            </div>
                            <div className="subscription-card-image">
                              <div className="sub-image-container">
                                <img src={masterCard} alt="master card" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: "insurance",
                      label: "Insurance",
                      content: <p>Insurance information here</p>,
                    },

                    {
                      key: "payment",
                      label: "Payment",
                      content: <p>Payment options displayed here</p>,
                    },
                  ]}
                />

                <Card
                  title="Invoices & Receipts"
                  bodyContent={
                    <>
                      <Tables
                        headers={["Payment Method", "Date", "Amount", "Status"]}
                        rows={[["Visa ***3719", "04/01/2025", "$300", "Paid"]]}
                        emptyMessage="No invoices found"
                      />
                    </>
                  }
                >
                  <div className="total-member">0 Document(s)</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PatientProfile;
