import EventForm from "./Form";
import img from "../../images/events.svg";

const Event = () => {
  return (
    <div className="flex xs:flex-col md:flex-row justify-between items-center p-5 w-full">
      <div className="flex justify-center items-center w-1/2">
        <img src={img} className="w-96" alt="Login" />
      </div>
      <div className="md:w-1/2 xs:w-full">
        <h2 className="flex justify-center w-full items-center text-2xl font-extrabold text-primary-600">
          Event Detail
        </h2>
        <EventForm />
      </div>
    </div>
  );
};

export default Event;
