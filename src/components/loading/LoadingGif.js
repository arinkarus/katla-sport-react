import React from 'react';
import { MDBRow } from 'mdbreact';

const LoadingGif = props => (
    <MDBRow className = "justify-content-center">
        <img src="/loading.gif" height="200px" />
    </MDBRow>
);

export default LoadingGif;