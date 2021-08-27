import { types } from "../types/types";

export const setSelectedDevice = ( device ) => ({
    type: types.deviceSelected,
    payload: device   
})

export const deviceLoaded = ( devices ) => {

    const params = devices.map( device => ({
        ...device,
        state: device.state //JSON.parse(device.state)
    }));

    return {
        type: types.devicesLoaded,
        payload: params
    }
}