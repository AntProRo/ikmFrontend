import {
  DOCUMENT_SUCCESS,
  DOCUMENT_FAIL,
  IMAGE_RETURN_SUCCESS,
  IMAGE_RETURN_FAIL,
  DOCUMENT_SAVE_SUCCESS,
  DOCUMENT_SAVE_FAILED,
  CANDIDATES_GET_SUCCESS,
  CANDIDATES_GET_FAILED,
  RESTORE_PROCESS,
  /* RECRUITER */
  /* SKIllS */
  SKILLS_GET_SUCCESS,
  SKILLS_GET_FAIL,
  SKILLS_POST_SUCCESS,
  SKILLS_POST_FAIL,
  SKILLS_UPDATE_SUCCESS,
  SKILLS_UPDATE_FAIL,
  SKILLS_DELETE_SUCCESS,
  SKILLS_DELETE_FAIL,
  /* SUBJECT */
  PRACTICES_SUBJECTS_GET_SUCCESS,
  PRACTICES_SUBJECTS_GET_FAIL,
  SUBJECT_POST_SUCCESS,
  SUBJECT_POST_FAIL,
  SUBJECT_DELETE_SUCCESS,
  SUBJECT_DELETE_FAIL,
  SUBJECT_UPDATE_SUCCESS,
  SUBJECT_UPDATE_FAIL,
  /* PRACTICE */
  PRACTICE_POST_SUCCESS,
  PRACTICE_POST_FAIL,
  PRACTICE_DELETE_SUCCESS,
  PRACTICE_DELETE_FAIL,
  PRACTICE_UPDATE_SUCCESS,
  PRACTICE_UPDATE_FAIL,
  /* RESTORE STATUS OR SKILLS */
  RESTORE_STATUS_200,
  RESTORE_SKILLS_PRACTICE,
  /* CROP OPTIONS */
  CROP_SAVE_SUCCESS,
  CROP_GET_SUCCESS,
  CROP_SAVE_FAIL,
  CROP_GET_FAIL,
  CROP_SUBJECT_SUCCESS,
  CROP_SUBJECT_FAIL,
} from "../actions/types";

const initialState = {
  /* upload file result */
  imageFile: null,
  dataFile: null,
  /* save and get data from data base */
  processResult: null,
  candidateList: [],
  skillList: [],
  /* POST */
  res: null,
  /* POST CROP */
  resCrop: {
    height: null,
    unit: null,
    width: null,
    x: null,
    y: null,
  },
  resCropSubject: null,
};

export default function uploadDocument(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case IMAGE_RETURN_SUCCESS:
      return {
        ...state,
        imageFile: payload,
      };
    case IMAGE_RETURN_FAIL:
      return {
        ...state,
        imageFile: "Fail_Image_Document",
      };
    case DOCUMENT_SUCCESS:
      return {
        ...state,
        dataFile: payload,
      };
    case DOCUMENT_FAIL:
      return {
        ...state,
        dataFile: "Fail_Upload_Document",
      };
    case DOCUMENT_SAVE_SUCCESS:
      return {
        ...state,
        processResult: "Saved",
      };
    case DOCUMENT_SAVE_FAILED:
      return {
        ...state,
        processResult: "Fail_Save_Document",
      };
    case CANDIDATES_GET_SUCCESS:
      return {
        ...state,
        candidateList: payload,
      };
    case CANDIDATES_GET_FAILED:
      return {
        ...state,
        processResult: "Fail_Get_Candidates",
      };
    case RESTORE_PROCESS:
      return {
        ...state,
        processResult: null,
        skillList: [],
        imageFile: null,
        candidateList: [],
        /* data: null, */
      };
    /* RECRUITER */
    /* SKILLS */
    case SKILLS_GET_SUCCESS:
      return {
        ...state,
        skillList: payload,
      };
    case SKILLS_GET_FAIL:
      return {
        ...state,
        skillList: "fail_get_skills",
      };
    case SKILLS_POST_SUCCESS:
      return {
        ...state,
        res: "Saved_skill",
      };
    case SKILLS_POST_FAIL:
      return {
        ...state,
        res: "fail_post_skill",
      };
    case SKILLS_UPDATE_SUCCESS:
      return {
        ...state,
        res: "Updated_skill",
      };
    case SKILLS_UPDATE_FAIL:
      return {
        ...state,
        res: "Fail_update_skill",
      };

    case SKILLS_DELETE_SUCCESS:
      return {
        ...state,
        res: "deleted_skill",
      };
    case SKILLS_DELETE_FAIL:
      return {
        ...state,
        res: "fail_delete_skill",
      };
    /* PRACTICE */
    case PRACTICES_SUBJECTS_GET_SUCCESS:
      return {
        ...state,
        processResult: payload,
      };
    case PRACTICES_SUBJECTS_GET_FAIL:
      return {
        ...state,
        processResult: "fail_get_Subject_and_Practice",
      };
    case PRACTICE_POST_SUCCESS:
      return {
        ...state,
        res: "Saved_practice",
      };
    case PRACTICE_POST_FAIL:
      return {
        ...state,
        res: "fail_post_practice",
      };
    case PRACTICE_UPDATE_SUCCESS:
      return {
        ...state,
        res: "Updated_practice",
      };
    case PRACTICE_UPDATE_FAIL:
      return {
        ...state,
        res: "Fail_updated_practice",
      };
    case PRACTICE_DELETE_SUCCESS:
      return {
        ...state,
        res: "deleted_practice",
      };
    case PRACTICE_DELETE_FAIL:
      return {
        ...state,
        res: "fail_delete_practice",
      };
    /* SUBJECT */
    case SUBJECT_POST_SUCCESS:
      return {
        ...state,
        res: "Saved_subject",
      };
    case SUBJECT_POST_FAIL:
      return {
        ...state,
        res: "fail_post_subject",
      };

    case SUBJECT_UPDATE_SUCCESS:
      return {
        ...state,
        res: "Update_subject",
      };
    case SUBJECT_UPDATE_FAIL:
      return {
        ...state,
        res: "Fail_update_subject",
      };
    case SUBJECT_DELETE_SUCCESS:
      return {
        ...state,
        res: "Deleted_subject",
      };
    case SUBJECT_DELETE_FAIL:
      return {
        ...state,
        res: "Fail_delete_subject",
      };
    case RESTORE_STATUS_200:
      return {
        ...state,
        res: null,
      };
    case RESTORE_SKILLS_PRACTICE:
      return {
        ...state,
        skillList: [],
      };
    /* CROP OPTIONS */
    case CROP_SAVE_SUCCESS:
      return {
        ...state,
        res: "Crop Saved as default",
      };
    case CROP_GET_SUCCESS:
      return {
        ...state,
        resCrop: payload,
      };
    case CROP_SAVE_FAIL:
      return {
        ...state,
        res: "fail",
      };
    case CROP_GET_FAIL:
      return {
        ...state,
        resCrop: null,
      };

    case CROP_SUBJECT_FAIL:
      return {
        ...state,
        resCropSubject: "Fail_save_crop_subject",
      };

    case CROP_SUBJECT_SUCCESS:
      return {
        ...state,
        resCropSubject: "saved",
      };

    default:
      return state;
  }
}
