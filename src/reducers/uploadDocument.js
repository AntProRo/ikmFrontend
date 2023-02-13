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
  /* SUBJECT */
  PRACTICES_SUBJECTS_GET_SUCCESS,
  PRACTICES_SUBJECTS_GET_FAIL,
  SUBJECT_POST_SUCCESS,
  SUBJECT_POST_FAIL,
  /* PRACTICE */
  PRACTICE_POST_SUCCESS,
  PRACTICE_POST_FAIL,
  PRACTICE_DELETE_SUCCESS,
  PRACTICE_DELETE_FAIL,
  /* RESTORE STATUS 200 */
  RESTORE_STATUS_200,
  RESTORE_SKILLS_PRACTICE
} from "../actions/types";

const initialState = {
  /* upload file result */
  imageFile:null,
  dataFile: null,
  /* save and get data from data base */
  processResult: null,
  candidateList: [],
  skillList: [],
  /* POST */
  res: null,
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
        imageFile:null,
        candidateList: []
        /*      data: null, */
      };
    /* RECRUITER */
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
        res: "Saved",
      };
    case SKILLS_POST_FAIL:
      return {
        ...state,
        res: "fail_post_skill",
      };

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

    case SUBJECT_POST_SUCCESS:
      return {
        ...state,
        res: "Saved",
      };
    case SUBJECT_POST_FAIL:
      return {
        ...state,
      res: "fail_post_subject",
      };

    case PRACTICE_DELETE_SUCCESS:
      return {
        ...state,
        res: "deleted",
      };
    case PRACTICE_DELETE_FAIL:
      return {
        ...state,
        res: "fail_delete_practice",
      };
    case PRACTICE_POST_SUCCESS:
      return {
        ...state,
        res: "Saved",
      };
    case PRACTICE_POST_FAIL:
      return {
        ...state,
        res: "fail_post_practice",
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
        }

    default:
      return state;
  }
}
