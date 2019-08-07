import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ControlledSelect extends PureComponent {
    render() {
        const { caption, name, onChange, defaultValue, isError, errorMessage } = this.props;
        const options =
            this.props.values.map((item) => <option key={item.id} value={item.id}>{item.name}</option>);
        return (
            <div className="form-group has-success">
                <label htmlFor={name}>{caption}</label>
                <select
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    className={"form-control " + (isError ? 'is-invalid' : '')}
                    name={name}
                    onChange={onChange}
                    defaultValue={defaultValue}>
                    {this.props.selectCaption && <option value=""> {this.props.selectCaption}</option>}
                    {options}
                </select>
                <div className="invalid-feedback">{errorMessage}</div>
            </div>
        );
    }
}

ControlledSelect.propTypes = {
    caption: PropTypes.string,
    errorMessage: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    selectCaption: PropTypes.string,
    name: PropTypes.string.isRequired,
    values: PropTypes.instanceOf(Object)
};

ControlledSelect.defaultProps = {
    errorMessage: '',
    isError: false
};

export default ControlledSelect;