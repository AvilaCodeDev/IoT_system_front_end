import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { sendDeviceData } from '../../socket/socket';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

  const initDevice = {
    type: "1",
    label: '',
    manufacturer: '',
    state:{
        turnedOn: false,
    }
};

export const DevicesModal = () => {


    // const [ formnValues, handleInputChange ] = useForm( initDevice );
    const [ formValues , setFormValues] = useState( initDevice );
    const { selectedDevice } = useSelector(state => state.devices);
    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const { type, label, manufacturer, state } = formValues;

    useEffect(() => {
        if( selectedDevice ){
            setFormValues( selectedDevice );
        }else{
            setFormValues( initDevice );
        }
    }, [ selectedDevice, setFormValues ])


    const closeModal = () => {
        dispatch( uiCloseModal() );
        setFormValues( initDevice );
    }

    const handleInputchange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleSpeedChange = ( { target } ) =>{

        setFormValues({
            ...formValues,
            state: {
                ...formValues.state,
                speed: target.value
            }
        })
    }

    const handleRadioButtonChange = ( { target } ) =>{

            setFormValues({
                ...formValues,
                state:{
                    ...state,
                    turnedOn: target.checked,
                }
            })
        }
        


    const handleSubmit = ( e ) => {
        e.preventDefault();

        if( type === '1' && !parseInt(state.speed) ){
            return Swal.fire('Error', 'Speed must be a number', 'error');
        }
        

        sendDeviceData( formValues, ( ok, action ) => {
            if( !ok ){
                Swal.fire('Error!', `The device could not be ${ action }. Try again. If the error persists, contact your system administrator.`, 'error');
            }else{
                Swal.fire('Success', `The device has been successfully ${ action }.`, 'success');
                closeModal();
            }
        });
    }

    return (
        <div>
            <Modal
                isOpen={ modalOpen }
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                className="modal"
                closeTimeoutMS={200}
                overlayClassName="modal-fondo"
            >
                <h1>New Device</h1>
                <hr />
                <form
                    className = "conatiner"
                    onSubmit = { handleSubmit }
                >
                    <div
                        className = "form-group"
                    >
                        <label> Type </label>
                        <select className="form-select" name="type" value={ type } onChange = { handleInputchange } >
                            <option value="1">Fan</option>
                            <option value="2">Light</option>
                        </select>
                    </div>

                    <div
                        className = "form-group"
                    >
                        <label> Label </label>
                        <input type="text" className="form-control" name="label" required  onChange= { handleInputchange } value = { label } autoComplete="off" />
                    </div>

                    <div
                        className = "form-group"
                    >
                        <label> Manufacturer </label>
                        <input type="text" className="form-control" name="manufacturer" required  onChange= { handleInputchange } value = { manufacturer} autoComplete="off" />
                    </div>

                    {
                        ( (type === "1" || type === 1) && state.turnedOn === true )
                        && ( 
                            <div
                                className = "form-group"
                            >
                                <label> Speed </label>
                                <input type="text" className="form-control" name="speed" required  onChange = { handleSpeedChange } value = { state.speed } autoComplete="off" />
                            </div> 
                        )
                    }

                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="turnOnButton">Turn Off/On</label>
                        <input className="form-check-input" type="checkbox" id="turnOnButton"  onChange = { handleRadioButtonChange } checked={ state.turnedOn } autoComplete="off" />
                    </div>


                    <div className="d-flex flex justify-content-center" >
                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block btn-guardar"
                        >
                            <i className="far fa-save"></i>
                            <span> Save </span>
                        </button>
                    </div>
                    
                </form>
            </Modal>
            
        </div>
    )
}
