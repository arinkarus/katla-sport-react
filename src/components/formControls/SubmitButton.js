import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MDBBtn } from 'mdbreact';

class SubmitButton extends PureComponent {
    render() {
        const innerContent = this.props.innerContent;
        const isLoading = this.props.isLoading;
        let color = this.props.color;
        return (
            <MDBBtn
                gradient={this.props.gradient}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                type="submit"
                color={color}
            >
                <Fragment>
                    {
                        isLoading &&
                        <span
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                            aria-hidden="true" />
                    }
                    {innerContent}
                </Fragment>
            </MDBBtn>
        );
    }
}

SubmitButton.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.func,
    gradient: PropTypes.string,
    innerContent: PropTypes.node,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func
};

SubmitButton.defaultProps = {
    color: "cyan",
    gradient: "",
    isLoading: false
};

export default SubmitButton;