import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { DevicesModal } from '../devices/DevicesModal';

export const Filters = () => {

    const dispatch = useDispatch();

    const handleAddDevice = () =>{
        dispatch( uiOpenModal() );
    }

    return (
        <div className = "filters-container" >
            <button 
                className = "btn btn-primary"
                onClick = { handleAddDevice }
            > 
                <i className="fas fa-plus"></i> Add device 
            </button>

            <DevicesModal />
        </div>
    )
}
