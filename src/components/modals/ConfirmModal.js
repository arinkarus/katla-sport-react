import React, { PureComponent } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';

class ConfirmModal extends PureComponent {
    render() {
        const { isOpen, message, toggle, modalTitle, onSave, buttonName } = this.props;
        return (
            <MDBContainer>
                <MDBModal isOpen={isOpen} toggle={toggle}>
                    <MDBModalHeader toggle={toggle}>{modalTitle}</MDBModalHeader>
                    <MDBModalBody>
                        {message}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={toggle} color="red">Cancel</MDBBtn>
                        <MDBBtn gradient="peach" onClick={onSave}>{buttonName}</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    modalTitle: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

ConfirmModal.defaultProps = {
    buttonName: "OK",
    modalTitle: "Are you sure?",
    message: "Changes made by you will be irreversible!"
};

export default ConfirmModal;