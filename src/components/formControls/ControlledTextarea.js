import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ControlledTextarea extends PureComponent {
    render() {
        const { defaultValue,
            name,
            caption,
            rowCount,
            onChange,
            onBlur,
            onFocus,
            isError,
            errorMessage } = this.props;
        const style = { resize: 'none' };
        return (
            <div className="form-group has-success mt-2">
                <label htmlFor={name}>{caption}</label>
                <textarea
                    defaultValue={defaultValue}
                    id={name}
                    name={name}
                    rows={rowCount}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    style={style}
                    className={"form-control " + (isError ? 'is-invalid' : '')} />
                <div className="invalid-feedback">{errorMessage}</div>
            </div>
        );
    }
}

ControlledTextarea.propTypes = {
    areaCaption: PropTypes.string,
    caption: PropTypes.string,
    defaultValue: PropTypes.string,
    errorMessage: PropTypes.string,
    name: PropTypes.string.isRequired,
    isError: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    rowCount: PropTypes.number
};

ControlledTextarea.defaultProps = {
    rowCount: 5,
    isError: false,
    errorMessage: ''
};

export default ControlledTextarea;