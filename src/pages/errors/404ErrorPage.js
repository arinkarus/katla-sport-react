import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer, MDBRow, MDBCol
} from 'mdbreact';

class _404ErrorPage extends React.Component {
    render() {
        return (
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol md="6">
                        Sorry, page that you are looking for is not found!
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            );
    }
}

export default connect()(_404ErrorPage);