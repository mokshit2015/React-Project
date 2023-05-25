import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setEventDataFromStorage } from "../../actions/event.action";
import { setUserEventDataFromStorage } from "../../actions/login.action";
import { getDataFromStorage, saveDataToStorage } from "../../utils";

const EventDisplay = () => {
  const eventDetails = useSelector((state) => state.login.userEventDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (event) => {
    navigate("/", {
      state: event,
    });
  };

  const handleDelete = async (id) => {
    try {
      const eventDetails = (await getDataFromStorage("eventDetails")) || [];
      const userDetails = await getDataFromStorage("event_login");
      const userEventDetails = userDetails?.eventDetails || [];

      const updatedEventDetails = eventDetails.filter(
        (event) => event.eventId !== id
      );
      const updatedUserEventDetails = userEventDetails.filter(
        (event) => event.eventId !== id
      );
      dispatch(setEventDataFromStorage(updatedEventDetails));
      saveDataToStorage("eventDetails", updatedEventDetails);
      dispatch(setUserEventDataFromStorage(updatedUserEventDetails));
      saveDataToStorage("event_login", {
        ...userDetails,
        eventDetails: updatedUserEventDetails,
      });
      toast.success("Event Deleted Successfully");
    } catch (err) {
      toast.error("Error Occurs");
    }
  };

  return (
    <div>
      <div className="flex justify-center w-full items-center text-2xl font-extrabold text-primary-600">
        Event Display
      </div>
      <div className="flex text-2xl bg-white p-2 m-2  xs:ml-4 md:flex-row xs:flex-col">
        {eventDetails ? (
          eventDetails.map((event) => {
            return (
              <div
                className="rounded-xl bg-white shadow-xl md:w-1/5 xs:w-11/12 dark:bg-neutral-700 m-3"
                key={event.eventId}
              >
                <div className="py-4">
                  <div className="flex justify-between px-6 font-bold text-xl border-b-2 border-neutral-100 py-3 dark:border-neutral-600 dark:text-neutral-50">
                    <div>{event.eventName}</div>
                    <div>
                      {event?.eventType === "normalBooking" ? (
                        ""
                      ) : (
                        <span className="inline-block bg-success-700 rounded-full px-3 py-1 text-xs font-semibold text-white mr-2 mb-0">
                          Premium{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3  relative">
                    <div className="text-base m-2">
                      <span className="font-extrabold">Date: </span>
                      {moment(event.eventDate).format("DD-MM-YYYY")}
                    </div>
                    <div className="text-base m-2">
                      <span className="font-extrabold">Description: </span>
                      {event.eventDescription}
                    </div>
                    <div className="flex justify-center m-2 text-base">
                      <span className="font-extrabold">
                        ${event.eventPrice}
                      </span>
                    </div>
                  </div>
                  <div className="flex pt-1 border-t-2 border-neutral-100 px-2 dark:border-neutral-600 dark:text-neutral-50">
                    <button
                      className="w-96 text-sm  flex items-center justify-center rounded border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-3 pt-1 pb-1 m-3 xs:text-xs"
                      onClick={() => handleEdit(event)}
                      data-te-toggle="modal"
                      data-te-target={`#previewForm`}
                    >
                      <span className="ml-2">Edit</span>
                    </button>
                    <button
                      className="w-96 text-sm rounded border-2 border-danger-600 text-danger-600 hover:bg-danger-600 hover:text-white px-3 pt-1 pb-1 m-3 xs:text-xs"
                      onClick={() => handleDelete(event.eventId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <> No Events Found for User</>
        )}
      </div>
    </div>
  );
};

export default EventDisplay;
