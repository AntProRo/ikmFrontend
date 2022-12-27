import { DOCUMENT_SUCCESS, DOCUMENT_FAIL } from "./types";
import { adminService } from "../httpServices/authService";


export const postDocument = (formData) => async (dispatch) => {
  try {
    const { ApiUploadDocument } = adminService();
    const res = await ApiUploadDocument(formData);

    if (res.status !== 200) {
      dispatch({
        type: DOCUMENT_FAIL,
      });
    } else {
      dispatch({
        type: DOCUMENT_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: DOCUMENT_FAIL,
    });
  }
};
