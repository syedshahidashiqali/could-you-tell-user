import React, { useEffect } from 'react'
import propTypes from 'prop-types';
import {Modal} from 'bootstrap';

function ConfirmPopup({title,message,onCancel,onConfirm,active}) {
    const toggleModal = (value)=> {
        const confirmModal = Modal.getOrCreateInstance(document.getElementById('confirm-popup'))
        if (value) {
            confirmModal.show();
        } else {
            confirmModal.hide();
            // confirmModal.hide();
        }
    };
    // this function handle the issues of modal backdrop as sometimes bootstrap modal 
    // don't remove backdrop which cause overlay

    const handleModalHide = function (event) {
        document.querySelectorAll('.modal-backdrop.show').forEach(el => el.remove());
    };
    // listeners registeration for popup hide
    const registerListener = ()=> {
        var myModalEl = document.getElementById('confirm-popup');
        if(myModalEl){
            
            myModalEl.addEventListener('hide.bs.modal', handleModalHide);
        }
    };
    const unRegisterListener = ()=> {
        var myModalEl = document.getElementById('confirm-popup');
        if(myModalEl){
            
            return myModalEl.removeEventListener('hide.bs.modal',handleModalHide);
        }
    };
    const handleCancel = ()=> {
        toggleModal(false);
        onCancel();
    };
    const handleConfirm = ()=> {        
        toggleModal(false);
        onConfirm();
    };

    useEffect(()=>{      
        registerListener();
    },[]);

    useEffect(()=>{
        if(!active){
            return unRegisterListener();
        }
        toggleModal(active);
    },[active]);
    
    return (
        <div className="modal fade" id="confirm-popup" aria-labelledby="logout" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> <img src="images/close-icon.svg" alt="" className="img-fluid" /></button>
                    </div>
                    <div className="modal-body text-center border-0 pt-0 px-0">
                        <img src="images/warning-icon.png" alt="" className="img-fluid" />
                        <h5 className="modal-title modal-heading">{title}</h5>
                        <p className="modal-text">{message}</p>
                    </div>
                    <div className="modal-footer border-0 justify-content-center align-items-start pb-5">
                        <a onClick={()=> handleConfirm()}  className="cursor btn gold-btn-solid d-inline-block eq-width-btn">Yes</a>
                        <button onClick={() => handleCancel()} type="button" className="btn black-btn-outline d-inline-block eq-width-btn">No</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
ConfirmPopup.propTypes = {
    active : propTypes.bool,
    onConfirm : propTypes.func,
    onCancel : propTypes.func,
    message : propTypes.string,
};
ConfirmPopup.defaultProps = {
    active : false,
    onConfirm : ()=> {},
    onCancel : ()=> {},
    title : 'System Message!',
    message : 'Are you sure you want this?',
};
export default ConfirmPopup