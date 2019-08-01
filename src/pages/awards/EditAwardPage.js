import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBNavLink, MDBTable,
    MDBTableHead, MDBTableBody, MDBBtn
} from 'mdbreact';
import history from '../../utils/history';

class EditAwardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    goBackToList() {
       history.push("/awards");
    } 

    render() {
        return (
            <MDBContainer>
                Update
            </MDBContainer>
        );
    }
}

export default connect()(EditAwardPage);