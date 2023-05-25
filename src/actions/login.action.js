export const loginAction = (data) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN", payload: data });
  };
};

export const addUserEventAction = (data) => {
  return (dispatch) => {
    dispatch({ type: "ADD_USER_EVENT_DATA", payload: data });
  };
};

export const editUserEventAction = (data) => {
  return (dispatch) => {
    dispatch({ type: "EDIT_USER_EVENT_DATA", payload: data });
  };
};

export const removeUserEventAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE_USER_EVENT_DATA", payload: id });
  };
};

export const setUserEventDataFromStorage = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_USER_EVENT_DATA_FROM_STORAGE", payload: data || [] });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };
};
