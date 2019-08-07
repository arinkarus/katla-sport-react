import React from 'react';
import PropTypes from 'prop-types';
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
    MDBCardHeader, MDBBtn
} from "mdbreact";
import ControlledInput from '../formControls/ControlledInput';
import ControlledTextarea from '../formControls/ControlledTextarea';
import ControlledSelect from '../formControls/ControlledSelect';
import SumbitButton from '../formControls/SubmitButton';

class EmployeeForm extends React.PureComponent {
    render() {
        return (
            <MDBContainer fluid>
                <MDBRow className="ml-3 justify-content-center">
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardHeader
                                className="form-header peach-gradient text-center text-white">
                                <h4 className="my-3">
                                    {this.props.formName}
                                </h4>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <form>
                                    <ControlledInput
                                        caption="Name for employee"
                                        name="name"
                                        defaultValue={this.props.employee.name}
                                        isError={this.props.validationErrors.name.length !== 0}
                                        errorMessage={this.props.validationErrors.name}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                    />
                                    <ControlledInput
                                        caption="Surname for employee"
                                        name="surname"
                                        defaultValue={this.props.employee.surname}
                                        isError={this.props.validationErrors.surname.length !== 0}
                                        errorMessage={this.props.validationErrors.surname}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                    />
                                    <ControlledInput
                                        caption="Email for employee"
                                        name="email"
                                        defaultValue={this.props.employee.email}
                                        isError={this.props.validationErrors.email.length !== 0}
                                        errorMessage={this.props.validationErrors.email}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                    />
                                    <ControlledTextarea
                                        caption="About"
                                        name="about"
                                        defaultValue={this.props.employee.about}
                                        isError={this.props.validationErrors.about.length !== 0}
                                        errorMessage={this.props.validationErrors.about}
                                        rowCount={3}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                    />

                                    <ControlledSelect
                                        caption="Select parent department"
                                        name="parentDepartmentId"
                                        errorMessage={this.props.validationErrors.parentDepartmentId}
                                        isError={this.props.validationErrors.parentDepartmentId.length !== 0}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                        values={this.props.parentDepartments}
                                        defaultValue={this.props.employee.parentDepartmentId}
                                        selectCaption="Parent department not selected" />

                                    {this.props.isLoadingChildDepartments && "Loading child departments..."}
                                    {(this.props.childDepartments && this.props.employee.parentDepartmentId) &&
                                        <ControlledSelect
                                            caption="Select department"
                                            name="departmentId"
                                            errorMessage={this.props.validationErrors.departmentId}
                                            isError={this.props.validationErrors.departmentId.length !== 0}
                                            onChange={this.props.onChange}
                                            onBlur={this.props.onBlur}
                                            onFocus={this.props.onFocus}
                                            values={this.props.childDepartments}
                                            defaultValue={this.props.employee.departmentId}
                                            selectCaption="Parent department not selected" />
                                    }
                                    <MDBRow className="justify-content-center">
                                        <SumbitButton 
                                            onClick={this.props.onSubmit}
                                            innerContent={this.props.submitButtonCaption}
                                            isLoading={this.props.isSaving}
                                        />
                                    </MDBRow>

                                    <MDBRow className="justify-content-center">
                                        <MDBBtn size="sm" color="red" onClick={this.props.goToList}>
                                           To list
                                        </MDBBtn>
                                    </MDBRow>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
        
EmployeeForm.propTypes = {
    employee: PropTypes.instanceOf(Object),
    validationErrors: PropTypes.instanceOf(Object),
    goToList: PropTypes.func,
    formName: PropTypes.string,
    isSaving: PropTypes.bool,
    isLoadingChildDepartments: PropTypes.bool,
    childDepartments: PropTypes.instanceOf(Object),
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    submitButtonCaption: PropTypes.string
};

export default EmployeeForm;