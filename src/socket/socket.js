import { io } from 'socket.io-client'

let socket;

export const initiateSocket = () => {
    socket = io(process.env.REACT_APP_SERVER_NAME);
    console.log('Connecting socket...');
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if( socket ) socket.disconnect();
}

export const getAllDevices = ( callback ) => {
    socket.on( 'all-devices',( devices ) => {
        callback( devices );
    });
}

export const sendDeviceData = ( device, callbak ) =>{    
    if ( device.id ){
        socket.emit( 'update-device', { device }, ( { ok } ) => {
            callbak( ok, 'modified' );
        });
    }else{
        socket.emit( 'add-device', { device } , ( { ok } ) => {
            callbak( ok, 'added');
        });
    }
}

export const deleteDevice = ( id, callback ) =>{
        socket.emit( 'delete-device', { id }, ( { ok } ) => {
            callback( ok );
        });
}

export const stopedDevice = (callback) => { 
    socket.on( 'stop-device', ( { stoped } ) => {
        callback( stoped );
    })
}
