import React from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import { withRouter } from 'react-router';

class NavMenu extends React.Component {
    state = {
        isOpen: false,
        currentLink: "home"
    };

    handleOnNavLinkClick(name, e) {
        this.setState({ currentLink: name });
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const link = this.state.currentLink;
        return (
            <MDBNavbar color="cyan" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">Katla-sport</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem className={link === "home" ? "active" : ""}>
                            <MDBNavLink onClick={(e) => this.handleOnNavLinkClick("home", e)} to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className={link === "awards" ? "active" : ""}>
                            <MDBNavLink onClick={(e) => this.handleOnNavLinkClick("awards", e)} to="/awards">Awards</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className={link === "employees" ? "active" : ""}>
                            <MDBNavLink onClick={(e) => this.handleOnNavLinkClick("employees", e)} to="/employees">Employees</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem className={link === "departments" ? "active" : ""}>
                            <MDBNavLink onClick={(e) => this.handleOnNavLinkClick("departments", e)} to="/departments">Departments</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default withRouter(NavMenu);