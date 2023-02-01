
import axios from "axios";


export const HttpService = () => { 
  const createRequestOptions = 
    (method, url, body) => {
      return {
        url: url,
        method: method,
        headers: {
          Authorization:`JWT ${localStorage.getItem("access")}`,
          Accept: "application/json", 
        },
        data: body,
      };
    }

  const createRequestOptionsNoBody = 
    (method, url) => {
      return {
        url: url,
        method: method,
        headers: {
          Authorization:`JWT ${localStorage.getItem("access")}`,
        },
      };
    }

  const fetchProcess = (async (_, options, name, errorResponse) => {
    let response;
    try {
      const res = await axios(options);
      if (res) {
        return res;
      }
    } catch (err) {
      response = err.response;
      console.error(name, err);
    }
    return { ...errorResponse, ...response };
  });

  const get = 
    async (url, name, errorResponse) => {
      const options = createRequestOptionsNoBody("get", url);
      return fetchProcess(url, options, name, errorResponse);
    }


  const post = 
    async (url, body, name, errorResponse) => {
      const options = createRequestOptions("post", url, body);
      return fetchProcess(url, options, name, errorResponse);
    }
   

  const put = 
    async (url, body, name, errorResponse) => {
      const options = createRequestOptions("put", url, body);
      return fetchProcess(url, options, name, errorResponse);
    }

  const patch = 
    async (url, body, name, errorResponse) => {
      const options = createRequestOptions("patch", url, body);
      return fetchProcess(url, options, name, errorResponse);
    }

  const deleteFn =
    async (url, name, errorResponse) => {
      const options = createRequestOptions("delete", url);
      return fetchProcess(url, options, name, errorResponse);
    }


  return { get, post, put, patch, deleteFn };
};