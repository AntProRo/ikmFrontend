import {
  IMAGE_RETURN_SUCCESS,
  IMAGE_RETURN_FAIL,
  DOCUMENT_SUCCESS,
  DOCUMENT_FAIL,

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
  SKILLS_DELETE_FAIL,
  SKILLS_DELETE_SUCCESS,
  SKILLS_UPDATE_SUCCESS,
  SKILLS_UPDATE_FAIL,
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
/* RESTORES STORAGE */
  RESTORE_STATUS_200,
  RESTORE_SKILLS_PRACTICE,
  /* CROP OPTIONS */
  CROP_SAVE_SUCCESS,
  CROP_GET_SUCCESS,
  CROP_SAVE_FAIL,
  CROP_GET_FAIL,
} from "./types";
import { adminService } from "../httpServices/authService";
const {
  ApiAnalysisDocument,
  ApiUploadDocument,
  ApiSaveDocument,
  ApiGetCandidates,
  /* RECRUITER */
  ApiGetPracticesAndSubjects,
  ApiGetSkills,
  ApiCreatePractice,
  ApiCreateSubject,
  ApiCreateSkill,
  /* DELETE  */
  ApiDeletePractice,
  ApiDeleteCandidate,
  ApiDeleteSkill,
  ApiDeleteSubject,
  /* UPDATE */
  ApiUpdatePractice,
  ApiUpdateSubject,
  ApiUpdateSkill,
  /* CROP */
  ApiSaveCropDefault,
  ApiGetCropDefault,

} = adminService();

export const restoreProcess = (status) => async (dispatch) => {
  if (status === null) {
    dispatch({
      type: RESTORE_PROCESS,
    });
  }
};

export const restoreSkills = (status) => async (dispatch) => {
  if (status === null) {
    dispatch({
      type:RESTORE_SKILLS_PRACTICE,
    });
  }
};

export const restoreStatus200 = (status)=> async(dispatch) => {
  if (status === null) {
    dispatch({
      type: RESTORE_STATUS_200,
    });
  } 
}

export const  postAnalysisDocument = (formData)=> async(dispatch) =>{
  try {
    const res = await ApiAnalysisDocument(formData);
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
}

export const postDocument = (formData) => async (dispatch) => {
  try {
    const res = await ApiUploadDocument(formData);
    if (res.status !== 200) {
      dispatch({
        type: IMAGE_RETURN_FAIL,
      });
    } else {
      dispatch({
        type: IMAGE_RETURN_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: IMAGE_RETURN_FAIL,
    });
  }
};

/* SAVE RESULT */
export const saveDocument = (formData) => async (dispatch) => {
  try {
    const res = await ApiSaveDocument(formData);
    if (res.status !== 200) {
      dispatch({
        type: DOCUMENT_SAVE_FAILED,
      });
    } else {
      dispatch({
        type: DOCUMENT_SAVE_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: DOCUMENT_SAVE_FAILED,
    });
  }
};

/* SUBJECT ANALYSIS SETTINGS */
export const getCandidates = () => async (dispatch) => {
  try {
    const res = await ApiGetCandidates();
    if (res.status !== 200) {
      dispatch({
        type: CANDIDATES_GET_FAILED,
      });
    } else {
      dispatch({
        type: CANDIDATES_GET_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: CANDIDATES_GET_FAILED,
    });
  }
};


export const deleteCandidate = (id) => async (dispatch) => {
  try {
    const res = await ApiDeleteCandidate(id);
    if (res.status !== 200) {
      dispatch({
        type: PRACTICE_DELETE_FAIL,
      });
    } else {
      dispatch({
        type: PRACTICE_DELETE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: PRACTICE_DELETE_FAIL,
    });
  }
};

/* PRACTICE */
export const getPracticesAndSubjects = () => async (dispatch) => {
  try {
    const res = await ApiGetPracticesAndSubjects();
    if (res.status !== 200) {
      dispatch({
        type: PRACTICES_SUBJECTS_GET_FAIL,
      });
    } else {
      dispatch({
        type: PRACTICES_SUBJECTS_GET_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: PRACTICES_SUBJECTS_GET_FAIL,
    });
  }
};


export const createPractice = (formData) => async (dispatch) => {
  try {
    const res = await ApiCreatePractice(formData);
    if (res.status !== 200) {
      dispatch({
        type: PRACTICE_POST_FAIL,
      });
    } else {
      dispatch({
        type: PRACTICE_POST_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: PRACTICE_POST_FAIL,
    });
  }
};


export const deletePractice = (id) => async (dispatch) => {
  try {
    const res = await ApiDeletePractice(id);
    if (res.status !== 200) {
      dispatch({
        type: PRACTICE_DELETE_FAIL,
      });
    } else {
      dispatch({
        type: PRACTICE_DELETE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: PRACTICE_DELETE_FAIL,
    });
  }
};


export const updatePractice =(formData,id) => async(dispatch)=> {
  try {
    const res = await ApiUpdatePractice(formData,id);
    if (res.status !== 200) {
      dispatch({
        type: PRACTICE_UPDATE_FAIL,
      });
    } else {
      dispatch({
        type: PRACTICE_UPDATE_SUCCESS,
        payload: res.data,
      });
    }
  } catch(err) {
    dispatch({
      type: PRACTICE_UPDATE_FAIL,
    });
  }
};

/* SUBJECTS */

export const createSubject = (formData, id) => async (dispatch) => {
  try {
    const res = await ApiCreateSubject(formData, id);
    if (res.status !== 200) {
      dispatch({
        type: SUBJECT_POST_FAIL,
      });
    } else {
      dispatch({
        type: SUBJECT_POST_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SUBJECT_POST_FAIL,
    });
  }
};

export const deleteSubject = (id) => async (dispatch) => {
  try {
    const res = await ApiDeleteSubject(id);
    if (res.status !== 200) {
      dispatch({
        type: SUBJECT_DELETE_FAIL,
      });
    } else {
      dispatch({
        type: SUBJECT_DELETE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SUBJECT_DELETE_FAIL,
    });
  }
};

export const updateSubject =(formData,id) => async(dispatch)=> {
  try {
    const res = await ApiUpdateSubject(formData,id);
    if (res.status !== 200) {
      dispatch({
        type: SUBJECT_UPDATE_FAIL,
      });
    } else {
      dispatch({
        type: SUBJECT_UPDATE_SUCCESS,
        payload: res.data,
      });
    }
  } catch(err) {
    dispatch({
      type: SUBJECT_UPDATE_FAIL,
    });
  }
};
/* SKILLS */
export const getSkills = (id) => async (dispatch) => {
  try {
    const res = await ApiGetSkills(id);
    if (res.status !== 200) {
      dispatch({
        type: SKILLS_GET_FAIL,
      });
    } else {
      dispatch({
        type: SKILLS_GET_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SKILLS_GET_FAIL,
    });
  }
};

export const createSkill = (formData, id) => async (dispatch) => {
  try {
    const res = await ApiCreateSkill(formData, id);
    if (res.status !== 200) {
      dispatch({
        type: SKILLS_POST_FAIL,
      });
    } else {
      dispatch({
        type: SKILLS_POST_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SKILLS_POST_FAIL,
    });
  }
};

export const updateSkill =(formData,id) => async(dispatch)=> {
  try {
    const res = await ApiUpdateSkill(formData,id);
    if (res.status !== 200) {
      dispatch({
        type: SKILLS_UPDATE_FAIL,
      });
    } else {
      dispatch({
        type: SKILLS_UPDATE_SUCCESS,
        payload: res.data,
      });
    }
  } catch(err) {
    dispatch({
      type: SKILLS_UPDATE_FAIL,
    });
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  try {
    const res = await ApiDeleteSkill(id);
    if (res.status !== 200) {
      dispatch({
        type: SKILLS_DELETE_FAIL,
      });
    } else {
      dispatch({
        type: SKILLS_DELETE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SKILLS_DELETE_FAIL,
    });
  }
};

/* CROP */

export const getCropDefault = () => async (dispatch) => {
  try {
    const res = await ApiGetCropDefault();
    if (res.status !== 200) {
      dispatch({
        type:  CROP_GET_FAIL,
      });
    } else {
      dispatch({
        type: CROP_GET_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type:  CROP_GET_FAIL,
    });
  }
};


export const updateCropDefault = (formData) => async (dispatch) => {
  try {
    const res = await ApiSaveCropDefault(formData);
    if (res.status !== 200) {
      dispatch({
        type: CROP_SAVE_FAIL,
      });
    } else {
      dispatch({
        type: CROP_SAVE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: CROP_SAVE_FAIL,
    });
  }
};
