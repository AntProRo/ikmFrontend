import { combineReducers } from "redux";

import auth from "./auth";
import loadingSpinner from "./loadingSpinner";
import uploadDocument from "./uploadDocument";


export default combineReducers({
    auth,
    loadingSpinner,
    uploadDocument
})