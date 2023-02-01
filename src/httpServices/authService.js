import {HttpService}  from "./httpService";

export const adminService = () => {
 const { post, get,  deleteFn,/* put */ } = HttpService(); 


/*   const updateUser = (id, body) => {
    const url = `/api/updateAccount/${id}`;
    return put(url, body, "updateAccount", {});
  }; */

  const ApiUploadDocument = (body) => {
    const url = `${process.env.REACT_APP_API_URL}/document/upload/`;
    return post(url, body, "uploadDocument", {});
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

  /* RECRUITER OPTIONS */

  return {
    ApiUploadDocument,
    ApiSaveDocument,
    ApiGetCandidates,
    ApiGetPracticesAndSubjects,
    ApiGetSkills,
    ApiCreatePractice,
    ApiCreateSubject,
    ApiCreateSkill,
    ApiDeletePractice

  };
};