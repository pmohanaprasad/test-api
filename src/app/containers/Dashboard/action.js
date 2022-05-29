export const GET_DETAIL = "GET_DETAIL";
export const DELETE_DETAIL = "DELETE_DETAIL";
export const ADD_DETAIL = "ADD_DETAIL";

export const GET = (payload) => ({
  type: GET_DETAIL,
  payload,
});

export const DELETE = (payload) => ({
  type: DELETE_DETAIL,
  payload,
});

export const ADD = (payload) => ({
  type: ADD_DETAIL,
  payload,
});
