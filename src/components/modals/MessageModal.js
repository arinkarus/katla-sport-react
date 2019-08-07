import React, { PureComponent } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';

class MessageModal extends PureComponent {
    render() {
        const { isOpen, message, toggle, modalTitle, buttonName } = this.props;
        return (
            <MDBContainer>
                <MDBModal isOpen={isOpen} toggle={toggle}>
                    <MDBModalHeader gradient="peach" toggle={toggle}>{modalTitle}</MDBModalHeader>
                    <MDBModalBody>
                        {message}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={toggle} color="primary">{buttonName}</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

MessageModal.propTypes = {
    buttonName: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    modalTitle: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired
};

MessageModal.defaultProps = {
    buttonName: "OK"
};

export default MessageModal;