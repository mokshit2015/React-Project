const intialState = {
  isLoggedIn: false,
  loginUserData: [],
  userEventDetails: [],
};

const loginReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        loginUserData: [...state.loginUserData, payload],
      };
    case "ADD_USER_EVENT_DATA":
      return {
        ...state,
        userEventDetails: [...state.userEventDetails, payload],
      };
    case "EDIT_USER_EVENT_DATA":
      const arr = [...state.userEventDetails];
      const eventIndex = arr.findIndex(
        (event) => event.eventId === payload.eventId
      );
      if (eventIndex > -1) {
        arr[eventIndex] = payload;
      }
      return {
        ...state,
        userEventDetails: arr,
      };
    case "SET_USER_EVENT_DATA_FROM_STORAGE":
      return {
        ...state,
        userEventDetails: [...payload],
      };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, loginUserData: [] };
    default:
      return { ...state };
  }
};

export default loginReducer;
