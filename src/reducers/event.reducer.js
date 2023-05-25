const intialState = {
  eventDetails: [],
};

const eventReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_EVENT":
      return {
        ...state,
        eventDetails: [...state.eventDetails, payload],
      };
    case "EDIT_EVENT":
      const arr = [...state.eventDetails];
      const eventIndex = arr.findIndex(
        (event) => event.eventId === payload.eventId
      );
      if (eventIndex > -1) {
        arr[eventIndex] = payload;
      }
      return {
        ...state,
        eventDetails: arr,
      };
    case "SET_EVENT_DATA_FROM_STORAGE":
      return {
        ...state,
        eventDetails: [...payload],
      };

    default:
      return { ...state };
  }
};

export default eventReducer;
