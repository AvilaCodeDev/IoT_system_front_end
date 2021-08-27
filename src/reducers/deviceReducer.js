import { types } from "../types/types";

const initialState = {}

export const deviceReducer = ( state = initialState , action ) => {
    switch ( action.type ) {
        case types.devicesLoaded:
            return {
                ...state,
                devices: [
                    ...action.payload
                ]
                
            }

        case types.deviceSelected:{
            return{
                ...state,
                selectedDevice: action.payload
            }
        }
    
        default:
            return state;
    }
}