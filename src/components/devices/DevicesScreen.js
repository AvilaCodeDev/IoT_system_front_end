import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deviceLoaded } from '../../actions/devices';
import { disconnectSocket, getAllDevices, initiateSocket, stopedDevice } from '../../socket/socket';
import { Device } from './Device';




export const DevicesScreen = () => {

    const { devices } = useSelector(state => state.devices);

    const dispatch = useDispatch();

    useEffect(() => {
        initiateSocket();
        getAllDevices( ( devicesList ) => {
            dispatch( deviceLoaded( devicesList ) );
        });
        stopedDevice(( stoped ) => {
            if( stoped ){
                Swal.fire('Atention!', `The device with id: ${ stoped } has faild `, 'error');
            }
        } );
        return () => {
            disconnectSocket();
        }
    }, [dispatch]);

    return (
        <div className="container-fluid">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Label</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">State</th>
                        <th scope="col">Speed</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ( !devices )
                            ? ( <tr><td> No data </td></tr> )
                            :devices.map( device => (
                                <Device 
                                    key= { device.id }
                                    device = { device }
                                />
                            ) )
                    }  
                </tbody>
            </table>  

        </div>
    )
}
