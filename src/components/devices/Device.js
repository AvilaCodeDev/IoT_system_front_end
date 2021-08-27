import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setSelectedDevice } from '../../actions/devices';
import { uiOpenModal } from '../../actions/ui';
import { deleteDevice } from '../../socket/socket';

export const Device = ( { device } ) => {
    const { turnedOn, speed } = device.state;
    const dispatch = useDispatch();

    const selectDevice = () => {
        dispatch( setSelectedDevice( device ) );
    }

    const handleDobleClick = () => {
        dispatch( uiOpenModal() );
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?', 
            text: 'You can not revert this action', 
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then( ( { isConfirmed } ) =>{
            if ( isConfirmed ){
                deleteDevice( device.id, ( ok ) =>{
                    Swal.fire('Succes!', 'The device has been successfully deleted', 'success');
                });
            } 
        });
    }

    return (
        <>
            <tr 
                key={ device.id }
                className = { ( turnedOn ) ? 'table-success' : 'table-danger' }
                onClick = { selectDevice }
                onDoubleClick = { handleDobleClick }
                            
            >
                <td> { device.typeDescription } </td>
                <td> { device.label } </td>
                <td> { device.manufacturer } </td>
                {
                    ( turnedOn )
                        ? <td> { 'On' } </td>
                        : <td> { 'Off' } </td>
                }
                {
                    ( speed )
                    ? <td> { speed } </td>
                    : <td> { '-' } </td>
                }
                <td> 
                    <button className="btn btn-danger" onClick= { handleDelete } > <i className="fas fa-trash-alt"></i> Delete </button> 
                </td>
            </tr>  
        </>
    )
}
