import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer
} from 'mdbreact';
import history from '../../utils/history';

class CreateAwardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    goBackToList() {
       history.push("/award");
    } 

    render() {
        return (
            <MDBContainer>
                Create
            </MDBContainer>
        );
    }
}

export default connect()(CreateAwardPage);