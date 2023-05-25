import { useForm, Controller } from "react-hook-form";
import DateField from "../../common/DateField";
import InputField from "../../common/InputField";
import {
  getDataFromStorage,
  getRandomNum,
  getUpdatedArray,
  saveDataToStorage,
} from "../../utils";
import { omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addEventAction, editEventAction } from "../../actions/event.action";
import {
  addUserEventAction,
  editUserEventAction,
} from "../../actions/login.action";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

const EventForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({});

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loginUserData = useSelector((state) => state.login.loginUserData);

  useEffect(() => {
    if (location?.state) {
      reset({
        ...location.state,
      });
      setIsEdit(true);
    } else {
      reset({
        eventType: "normalBooking",
      });
    }
  }, []);

  const onCancel = () => {
    reset({});
    setIsEdit(false);
  };

  const onSubmit = async (data) => {
    const eventDetails = (await getDataFromStorage("eventDetails")) || [];
    const userDetails = await getDataFromStorage("event_login");
    const info = omit(data, "termsConditions");
    if (isEdit) {
      toast.success("Event Edited Succesfully");
      navigate("/event");
      dispatch(editUserEventAction(info));
      dispatch(editEventAction(info));

      const newArr = getUpdatedArray(eventDetails, info);
      const newUserEventArr = getUpdatedArray(userDetails.eventDetails, info);
      saveDataToStorage("eventDetails", newArr);
      saveDataToStorage("event_login", {
        ...userDetails,
        eventDetails: newUserEventArr,
      });
    } else {
      const obj = {
        ...info,
        eventId: info.eventName.slice(0, 2) + "_" + getRandomNum(),
        userId: loginUserData[0].userId,
      };
      dispatch(addEventAction(obj));
      dispatch(addUserEventAction(obj));
      saveDataToStorage("eventDetails", [...eventDetails, obj]);
      saveDataToStorage("event_login", {
        ...userDetails,
        eventDetails: userDetails?.eventDetails
          ? [...userDetails.eventDetails, obj]
          : [obj],
      });
      toast.success("Event Created Succesfully");
      navigate("/event");
    }
    reset({
      eventType: "normalBooking",
    });
  };

  return (
    <div className="bg-white  rounded md:px-8 xs:px-3 pt-6 pb-8 mb-4 ">
      <form>
        <div className="md:flex md:items-center mb-2">
          <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Event Name
          </label>
          <div className="md:w-2/3 mt-2">
            <InputField
              fieldName="eventName"
              validationObj={{
                required: "Please Enter Event Name",
              }}
              register={register}
              errors={errors}
              fieldType="text"
              className="min-h-[auto] w-full rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              placeholder="Enter Event Name Here..."
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-2">
          <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Event Date
          </label>
          <div className="md:w-2/3 mt-2">
            <DateField
              fieldName="eventDate"
              validationObj={{
                required: "Please Enter Event Date",
              }}
              control={control}
              Controller={Controller}
              errors={errors}
              className="min-h-[auto] w-full rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-2">
          <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Event Description
          </label>
          <div className="md:w-2/3 mt-2">
            <InputField
              fieldName="eventDescription"
              validationObj={{
                required: "Please Enter Event Description",
              }}
              register={register}
              errors={errors}
              fieldType="text"
              className="min-h-[auto] w-full rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              placeholder="Enter Event Description Here..."
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-2">
          <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Event Price
          </label>
          <div className="md:w-2/3 mt-2">
            <InputField
              fieldName="eventPrice"
              validationObj={{
                required: "Please Enter Event Price",
              }}
              register={register}
              errors={errors}
              fieldType="number"
              className="min-h-[auto] w-full rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              placeholder="Enter Event Price Here..."
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-2">
          <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Booking Type
          </label>
          <div className="md:w-2/3 mt-2">
            <div className="flex">
              <InputField
                fieldName="eventType"
                validationObj={{
                  required: "Please Enter Event Price",
                }}
                register={register}
                errors={errors}
                value="normalBooking"
                fieldType="radio"
                className="min-h-[auto] mb-3 rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                placeholder="Enter Event Price Here..."
              >
                <span className="ml-2">Normal Booking</span>
              </InputField>

              <InputField
                fieldName="eventType"
                validationObj={{
                  required: "Please Enter Event Price",
                }}
                register={register}
                errors={errors}
                value="premiumBooking"
                fieldType="radio"
                className="min-h-[auto] ml-3 mb-3 rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                placeholder="Enter Event Price Here..."
              >
                <span className="ml-2">Premium Booking</span>
              </InputField>
            </div>
          </div>
        </div>
        {!isEdit && (
          <div className="md:flex md:items-center mb-7">
            <label className="md:w-1/3 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"></label>
            <div className="md:w-2/3 mt-2">
              <div className="flex">
                <InputField
                  fieldName="termsConditions"
                  validationObj={{
                    required: "Please Select Terms & Conditions",
                  }}
                  register={register}
                  errors={errors}
                  fieldType="checkbox"
                  className="min-h-[auto]rounded mb-5  border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                >
                  <span className="ml-2 mb-5">
                    Please Select Terms & Conditions
                  </span>
                </InputField>
              </div>
            </div>
          </div>
        )}

        <div className="w-100 flex flex-row items-center justify-evenly pb-3">
          <button
            type="submit"
            className="inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleSubmit(onSubmit)}
          >
            {isEdit ? "Save Changes" : "Submit"}
          </button>
          <button
            type="reset"
            className="inline-block rounded bg-danger-600 px-7 pt-3 pb-2.5 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-600-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-danger-600-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={onCancel}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
