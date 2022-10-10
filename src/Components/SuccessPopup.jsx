import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "bootstrap";
const SuccessPopup = function ({
  title,
  message,
  isError,
  active,
  delay,
  closed,
}) {
  const toggleModal = (value) => {
    const myModal = new Modal(document.getElementById("success-popup"), {});
    if (value) {
      myModal.show();
    } else {
      myModal.hide();
    }
  };
  useEffect(() => {
    var myModalEl = document.getElementById("success-popup");
    if (myModalEl) {
      myModalEl.addEventListener("hide.bs.modal", function (event) {
        document
          .querySelectorAll(".modal-backdrop.show")
          .forEach((el) => el.remove());
        closed();
      });
    }
  }, []);

  useEffect(() => {
    toggleModal(active);
  }, [active]);
  //   if (!active) return null;
  return (
    <>
      {/* SIGN UP SUCCESS MESSAGE */}
      <div
        className="modal fade"
        id="success-popup"
        aria-labelledby="signupSuccess"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          {active && (
            <div className="modal-content pb-5">
              <div className="modal-header border-0 pb-0">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <img
                    src="images/close-icon.svg"
                    alt=""
                    className="img-fluid"
                  />
                </button>
              </div>
              <div className="modal-body text-center border-0 py-0">
                {/* <div id="signedUp" className="w-50 mx-auto" /> */}
                {
                  <img
                    src={
                      !isError ? "images/green-check.svg" : "images/cancel.png"
                    }
                  />
                }
                <h5 className="modal-title modal-heading">
                  {title ? title : "System Message!"}
                </h5>
                <p className="modal-text">{message ? message : ""}</p>
              </div>
              <div className="modal-footer border-0 justify-content-center align-items-start text-center">
                <a
                  href="#"
                  className="btn gold-btn-solid d-inline-block eq-width-btn"
                  data-bs-dismiss="modal"
                >
                  OK
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
SuccessPopup.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isError: PropTypes.bool,
  active: PropTypes.bool,
  delay: PropTypes.number,
  closed: PropTypes.func,
};
SuccessPopup.defaultProps = {
  title: null,
  message: null,
  isError: false,
  active: false,
  delay: null,
  closed: () => {},
};

export default SuccessPopup;
