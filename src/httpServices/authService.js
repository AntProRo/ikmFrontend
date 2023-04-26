import {HttpService}  from "./httpService";

export const adminService = () => {
 const { post, get,  deleteFn, put  } = HttpService(); 


/*   const updateUser = (id, body) => {
    const url = `/api/updateAccount/${id}`;
    return put(url, body, "updateAccount", {});
  }; */
  const ApiUploadDocument = (body) => {
    const url = `${process.env.REACT_APP_API_URL}/document/upload/`;
    return post(url, body, "uploadDocument", {});
  };


  const ApiAnalysisDocument = (body) => {
    const url = `${process.env.REACT_APP_API_URL}/document/getAnalysis/`;
    return post(url, body, "getDocument", {});
  };

  const ApiSaveDocument = (body) => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/processFile/`;
    return post(url, body, "saveData", {});
  }

  const ApiGetCandidates = () => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/processFile/`;
    return get(url, "getInfoCandidates", {});
  }

/* RECRUITER OPTIONS */
  const ApiGetPracticesAndSubjects =()=> {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/getAllSubject/`;
    return get(url, "getPracticesAndSubjects", {});
  }

  const ApiGetSkills= (id) => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/getAllSkillsBySubject/${id}/`;
    return get(url, "GetSkillsBySubject", {});
  }; 

  const ApiCreatePractice= (body) => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/createPractice/`;
    return post(url, body,"CreatePractice", {});
  }; 
  const ApiCreateSubject =(body,id) => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/createSubject/${id}/`;
    return post(url, body,"CreateSubjectByPractice", {});
  }

  const ApiCreateSkill =(body,id) => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/createSkills/${id}/`;
    return post(url, body,"CreateSkillBySubject", {});
  }


  const ApiDeletePractice =(id) =>{
    const url = `${process.env.REACT_APP_API_URL}/recruiter/deletePractice/${id}/`;
    return deleteFn(url,"delete Practice",{})
  }

  const ApiDeleteSubject =(id) =>{
    const url = `${process.env.REACT_APP_API_URL}/recruiter/deleteSubject/${id}/`;
    return deleteFn(url,"delete Subject",{})
  }

  const ApiDeleteCandidate =(id) =>{
    const url = `${process.env.REACT_APP_API_URL}/recruiter/deleteCandidate/${id}/`;
    return deleteFn(url,"delete candidate",{})
  }

  const ApiDeleteSkill =(id) =>{
    const url = `${process.env.REACT_APP_API_URL}/recruiter/deleteSkill/${id}/`;
    return deleteFn(url,"delete Skill",{})
  }

  const ApiUpdatePractice = (body,id) => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/updatePractice/${id}/`;
    return put(url,body,"update practice",{})
  }

  const ApiUpdateSubject = (body,id) => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/updateSubject/${id}/`;
    return put(url,body,"update subject",{})
  }

  const ApiUpdateSkill = (body,id) => {
    const url = `${process.env.REACT_APP_API_URL}/recruiter/updateSkill/${id}/`;
    return put(url,body,"update skill",{})
  }

  const ApiSaveCropDefault = (body) => {
    const url =  `${process.env.REACT_APP_API_URL}/recruiter/saveCrop/`;
    return put(url,body,"Cropped updated",{})
  }


  const ApiSaveCropDefaultBySubject = (body,id) => {
    const url =  `${process.env.REACT_APP_API_URL}/recruiter/saveSubjectCrop/${id}/`;
    return put(url,body,"Cropped subject updated",{})
  }

  const ApiGetCropDefault = () => {
    const url =  `${process.env.REACT_APP_API_URL}/recruiter/saveCrop/`;
    return get(url,"Get default crop")
  }

  

  /* RECRUITER OPTIONS */

  return {
    ApiAnalysisDocument,
    ApiUploadDocument,
    ApiSaveDocument,
    ApiGetCandidates,
    ApiGetPracticesAndSubjects,
    ApiGetSkills,
    ApiCreatePractice,
    ApiCreateSubject,
    ApiCreateSkill,
    ApiDeletePractice,
    ApiDeleteSubject,
    ApiDeleteCandidate,
    ApiDeleteSkill,
    ApiSaveCropDefault,
    ApiGetCropDefault,
    ApiUpdatePractice, 
    ApiUpdateSubject,
    ApiUpdateSkill,
    ApiSaveCropDefaultBySubject,
  };
};