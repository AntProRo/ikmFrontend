import { DOCUMENT_SUCCESS, DOCUMENT_FAIL } from "../actions/types";

const initialState = {
  data: null
};

export default function uploadDocument(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DOCUMENT_SUCCESS:
      return {
        ...state,
        data: payload,
      };
    case DOCUMENT_FAIL:
      return {
        ...state,
        data: "fail",
      };
    default:
      return state;
  }
}
