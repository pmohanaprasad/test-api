export const FETCH_DETAILS = "FETCH_DETAILS";
export const ADD_DETAILS = "ADD_DETAILS";
export const DELETE_DETAILS = "DELETE_DETAILS";

export const FETCH = (payload) => ({
  type: FETCH_DETAILS,
  payload,
});

export const ADD = (payload) => ({
  type: ADD_DETAILS,
  payload,
});

export const DELETE = (payload) => ({
  type: DELETE_DETAILS,
  payload,
});
