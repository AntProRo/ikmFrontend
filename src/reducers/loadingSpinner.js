import {
SPINNER_ACTIVATED, SPINNER_DISABLED
} from "../actions/types"


const initialState = {
    spinnerActivated: false,
  };

export default function  loadingSpinner(state = initialState,action) {
    const {type} = action;
    switch (type) {
        case SPINNER_ACTIVATED:
            return {
            ...state,
            spinnerActivated:true
            };
        case SPINNER_DISABLED:
            return {
            ...state,
            spinnerActivated:false
                };
        default:
            return state;
    }
}

