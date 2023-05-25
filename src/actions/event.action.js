import { saveDataToStorage } from "../utils";

export const addEventAction = (data) => {
  return (dispatch) => {
    saveDataToStorage("event_details", data);
    dispatch({ type: "ADD_EVENT", payload: data });
  };
};

export const editEventAction = (data) => {
  return (dispatch) => {
    dispatch({ type: "EDIT_EVENT", payload: data });
  };
};

export const setEventDataFromStorage = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_EVENT_DATA_FROM_STORAGE", payload: data || [] });
  };
};
