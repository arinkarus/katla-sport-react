import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class EmployeeImage extends PureComponent {
    render() {
        return (
            <img
                style={{ maxWidth: this.props.maxSize }}
                src={this.props.path === null ? "/default-user.png" : this.props.path}
                className="mx-auto d-block rounded-circle employee-image"
                alt="employeeImage" />               
        );
    }
}

EmployeeImage.propTypes = {
    maxSize: PropTypes.number,
    path: PropTypes.string
};

EmployeeImage.defaultProps = {
    maxSize: 150
}

export default EmployeeImage;