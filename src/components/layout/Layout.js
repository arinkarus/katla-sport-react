import React from 'react';
import { MDBContainer } from 'mdbreact';
import NavMenu from './NavMenu';

const Layout = props => (
    <div>
        <NavMenu />
        <MDBContainer className="my-4" fluid>
                {props.children}
           </MDBContainer>
    </div>

);

export default Layout;