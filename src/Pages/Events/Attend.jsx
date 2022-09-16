import { reverse } from "named-urls";
import React, { Fragment, useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Unity, { UnityContent } from "react-unity-webgl";
import NoRecord from "../../Components/NoRecord";
import useMessagePopup from "../../Hooks/useMessagePopup";
import routes from "../../routes/routes";
import {
  getEvent,
  deleteInvitee,
  getAttendees,
  checkIsInvitee,
  completeEvent,
} from "../../Services/Events";
import { asset, notification } from "../../Util/helpers";

const unityContext = new UnityContent(
  "build/couldyoutellv17.json",
  "build/UnityLoader.js"
);
function AttendEvent() {
  let { id } = useParams();
  let [event, setEvent] = useState({});
  let [invitees, setInvitees] = useState([]);
  let user = useSelector((state) => state.user);
  let [roomCalled, setRoomCalled] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const [isInvitee, setIsInvitee] = useState(false);
  const [invite, setInvite] = useState({});
  const navigate = useNavigate();
  let { confirmPopup } = useMessagePopup();
  const fetchEvent = async () => {
    let { event } = await getEvent(id);
    setEvent(event);
    let file = asset(`uploads/${event?.media?.path}`);
    // console.log(file);
    let audio = new Audio(file);
    audio.setAttribute("crossOrigin", "anonymous");
    setAudio(audio);
  };
  const fetch = async function () {
    const { status, invite } = await checkIsInvitee(id);
    setIsInvitee(status);
    setInvite(invite);
    if (status) {
      let { invites } = await getAttendees(id);
      setInvitees(invites);
    }
  };
  window.CallMe = async () => {
    if (roomCalled > 0 && event?.room_data != null) {
      return;
    }
    setTimeout(() => {
      let room_data = event?.room_data
        ? JSON.stringify(event?.room_data)
        : JSON.stringify({});
      console.log(event);
      if (event?.room_data == null) {
        unityContext.send(
          "GameManager",
          "SelectRoom",
          event?.event_category?.room_index
        );
      } else {
        //for loading the json for host to edit the room after making it.
        unityContext.send("GameManager", "LoadRequestFromWeb", room_data);
      }
      setRoomCalled(roomCalled + 1);
    }, 1000);
  };
  const removeInvitee = async (id, index) => {
    try {
      let { message, status } = await deleteInvitee(id);
      let tempArray = [...invitees];
      tempArray.splice(index, 1);
      setInvitees(tempArray);
      notification(message);
    } catch (error) {
      console.log(error);
      notification(error?.message);
    }
  };
  const endEvent = async () => {
    confirmPopup({
      message: "Are you sure you want to end the event?",
      onConfirm: async () => {
        try {
          let { message } = await completeEvent(id);
          notification(message);
        } catch (error) {
          console.log(error);
          notification(error?.message, "error");
        }
      },
    });
  };
  const playMedia = () => {
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };
  const toggleSound = () => {
    audio.muted = !audio.muted;
  };

  useLayoutEffect(() => {
    fetchEvent();
    fetch();
  }, []);
  useEffect(() => {
    /* if(!isInvitee || invite?.status == 'Ended'){
            notification('you can\'t access this event. As you have ended it.','error');
            navigate(reverse(routes.eventDetail,{id}));
        } */
  }, [invite]);
  return (
    <section className="virtual-events text-white">
      <div className="container py-5">
        {/* UPCOMING EVENTS */}
        <div className="row align-items-start">
          {(isInvitee || event?.user == user?._id) && (
            <div className="col-lg-7 col-md-10 col-10 mx-auto text-start mb-5 pe-lg-5">
              <div className="d-flex justify-content-between align-items-end">
                <h1 className="heading-lvl-one d-flex align-items-center">
                  {event?.name}
                </h1>
              </div>
              <div className="row justify-content-start mt-3">
                <div className="col-md-4 col-sm-6 mb-5">
                  {/* Hosted by */}
                  <div className="d-flex align-items-center">
                    <i className="fas fa-user fs-30" />
                    <div className="host-info ms-2">
                      <h3 className="grey-text">Hosted by</h3>
                      <p>
                        {user?._id == event?.user
                          ? "You"
                          : event?.user_detail?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-5">
                  {/* Guest of Honor */}
                  <div className="d-flex align-items-center">
                    <i className="fas fa-crown fs-30" />
                    <div className="guest-info ms-2">
                      <h3 className="grey-text">Guest of Honor</h3>
                      <p>{event?.guest_of_honor}</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-md-8">
                  {event?.media && (
                    <div className="row justify-content-between align-items-center mb-5">
                      <div className="col-sm-6 mb-2">
                        <h4 className="fs-30 font-weight-light">
                          Media{" "}
                          <button
                            onClick={() => toggleSound()}
                            className="volume-btn"
                          >
                            <i className="fas fa-volume-up ms-2" />
                          </button>
                        </h4>
                      </div>
                      <div className="col-sm-4 mb-2">
                        <a
                          onClick={() => playMedia()}
                          className="cursor text-white font-weight-light"
                        >
                          {" "}
                          {isPlaying ? "Stop Playing" : "Start Playing"}{" "}
                        </a>
                      </div>
                      <div className="col-12 mt-4 mt-sm-0">
                        <canvas
                          style={{ width: "300px", height: "100px" }}
                        ></canvas>

                        {isPlaying ? (
                          <img
                            src="images/play-waves.gif"
                            className="img-fluid"
                          />
                        ) : (
                          <img
                            src="images/play-waves.png"
                            className="img-fluid"
                          />
                        )}
                        {/* <img src="images/play-waves.png" alt="" className="img-fluid" /> */}
                      </div>
                    </div>
                  )}
                  <div className="row justify-content-between align-items-baseline mb-4">
                    <div className="col-sm-6 mb-2">
                      <h4 className="fs-30 font-weight-light">Attendees </h4>
                    </div>
                    <div className="col-sm-6 mb-2">
                      <p className="text-white mb-0 font-weight-light">
                        ({event?.attendees_count || 0} people joined)
                      </p>
                    </div>
                    {/* attendees list */}
                    <div className="col-12 mb-4">
                      <div className="row justify-content-between align-items-center ps-sm-3">
                        {invitees?.map((item, itemIndex) => (
                          <Fragment key={itemIndex}>
                            <div className="col-10 my-3">
                              <div className="d-flex align-items-center justify-content-start">
                                <img
                                  crossOrigin="anonymous"
                                  src={item?.user?.user_image}
                                  alt=""
                                  className="img-fluid me-3"
                                />
                                <p>{item?.user?.name}</p>
                              </div>
                            </div>
                            <div className="col-2 my-3 text-end">
                              {event?.user == user?._id && (
                                <button
                                  onClick={() =>
                                    removeInvitee(item?._id, itemIndex)
                                  }
                                  type="button"
                                  className="cut-btn red"
                                >
                                  <i className="fas fa-times" />
                                </button>
                              )}
                            </div>
                          </Fragment>
                        ))}
                        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                      </div>
                    </div>
                    <div className="col-12">
                      <a
                        onClick={() => endEvent()}
                        className="cursor btn gold-btn-solid d-inline-block eq-width-btn px-5"
                      >
                        {event?.user == user?._id ? "Exit Event" : "End Event"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!isInvitee && (
            <div className="col-lg-7 col-md-10 col-10 mx-auto text-start mb-5 pe-lg-5">
              <NoRecord>You don't have permission to access this page</NoRecord>
            </div>
          )}
          <div className="col-lg-5 col-8 mx-auto text-center mb-5">
            <div className="position-relative">
              <img
                src="images/event-details-image.png"
                alt=""
                className="img-fluid"
              />
              <button
                type="button"
                className="zoom-btn"
                id="zoom-btn"
                data-bs-toggle="modal"
                data-bs-target="#zoomImage"
              >
                <i className="fas fa-search-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="zoomImage"
        tabindex="-1"
        aria-labelledby="giftModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content my-modal-class">
            <div className="modal-header border-0 pb-0 my-modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {" "}
                {/* <img src="images/close-icon.svg" alt="" className="img-fluid" /> */}
                <i class="fas fa-times modal-cencel-btn"></i>
              </button>
            </div>
            <div className="modal-body text-center border-0 pt-0 px-0 pb-0">
              <div className="position-relative">
                <Unity unityContent={unityContext} className="img-fluid" />
                {/* <img src="images/event-details-image.png" alt="" className="img-fluid w-90" /> */}
                {/* <button type="button" className="zoom-out-btn" id="zoom-out-btn" data-bs-toggle="modal" data-bs-target="#zoomImage"><i className="fas fa-search-minus"></i></button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AttendEvent;
