import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer, MDBRow, MDBCol, 
} from 'mdbreact';

const Home = props => (
    <MDBContainer>
        <MDBRow className="justify-content-center">
            <h2 className="h3-responsive">
                Welcome to katla-sport
            </h2>
        </MDBRow>
    </MDBContainer>
);

export default connect()(Home);