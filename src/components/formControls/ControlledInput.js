import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ControlledInput extends PureComponent {
    render() {
        return (
            <div className="form-group has-success">
                <label htmlFor={this.props.name}>{this.props.caption}</label>
                <input
                    type={this.props.type}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    onChange={this.props.onChange}
                    defaultValue={this.props.defaultValue}
                    name={this.props.name}
                    className={"form-control " + (this.props.isError ? 'is-invalid' : '')} />
                <div className="invalid-feedback">{this.props.errorMessage}</div>
            </div>
        );
    }
}

ControlledInput.propTypes = {
    isError: PropTypes.bool,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string
};

ControlledInput.defaultProps = {
    caption: '',
    type: 'text',
    isError: false
};

export default ControlledInput;