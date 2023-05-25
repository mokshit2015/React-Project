import storage from "redux-persist/lib/storage";

export const saveDataToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getDataFromLocalStorage = (key) => localStorage.getItem(key);

export const saveDataToStorage = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const getDataFromStorage = async (key) => {
  const res = await storage.getItem(key);
  if (res) {
    return JSON.parse(res);
  } else {
    return null;
  }
};

export function getRandomNum(minVal = 10001, maxVal = 99999) {
  var randVal = minVal + Math.random() * (maxVal - minVal);
  return Math.round(randVal);
}

export function removeLocalStorageData() {
  localStorage.removeItem("event_login");
}

export const getUpdatedArray = (eventArr, eventObj) => {
  const arr = [...eventArr];
  const eventIndex = arr.findIndex(
    (event) => event.eventId === eventObj.eventId
  );
  if (eventIndex > -1) {
    arr[eventIndex] = eventObj;
  }
  return arr;
};
