import {HttpService}  from "./httpService";

export const adminService = () => {
 const { post, get, deleteFn, put } = HttpService(); 

  const checkToken = () => {
    const url = `${process.env.REACT_APP_API_URL}/document/upload/`;
    return get(url, "checkAuthenticated", {});
  };


  const deleteUser = (id) => {
    const url = `/api/deleteUserAccount/${id}`;
    return deleteFn(url, "deleteUser", {});
  };

  const updateUser = (id, body) => {
    const url = `/api/updateAccount/${id}`;
    return put(url, body, "updateAccount", {});
  };

 

  const ApiUploadDocument = (body) => {
    const url = `${process.env.REACT_APP_API_URL}/document/upload/`;
    return post(url, body, "uploadDocument", {});
  };
  /* Collaborator */
  const getCollaboratorInfo = (id) => {
    const url = `/api/getCollaboratorInfo/${id}`;
    return get(url, "CollaboratorInfo", {});
  };
  

  return {
    checkToken,
    deleteUser,
    updateUser,
 
    ApiUploadDocument,
    getCollaboratorInfo,

  };
};