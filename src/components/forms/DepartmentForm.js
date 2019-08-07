import React from 'react';
import PropTypes from 'prop-types';
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
    MDBCardHeader, MDBBtn
} from "mdbreact";
import ControlledInput from '../formControls/ControlledInput';
import ControlledTextarea from '../formControls/ControlledTextarea';
import SumbitButton from '../formControls/SubmitButton';
import ControlledSelect from '../formControls/ControlledSelect';

class DepartmentForm extends React.PureComponent {

    constructor(props) {
        super(props);
        this.showParentDepartmentsSelect = this.showParentDepartmentsSelect.bind(this);
    }

    showParentDepartmentsSelect() {
        return (this.props.mode === "save") ||
            !(this.props.mode === "edit" && this.props.selectedDepartment === null);
    }

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
                                        caption="Name for department"
                                        name="name"
                                        defaultValue={this.props.department.name}
                                        isError={this.props.validationErrors.name.length !== 0}
                                        errorMessage={this.props.validationErrors.name}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                    />
                                    <ControlledTextarea
                                        caption="Description for department"
                                        name="description"
                                        defaultValue={this.props.department.description}
                                        isError={this.props.validationErrors.description.length !== 0}
                                        errorMessage={this.props.validationErrors.description}
                                        rowCount={3}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                    />
                                    {this.showParentDepartmentsSelect() &&
                                        <ControlledSelect
                                            caption="You can select parent department for this"
                                            name="parentId"
                                            errorMessage={this.props.validationErrors.parentId}
                                            isError={this.props.validationErrors.parentId.length !== 0}
                                            onChange={this.props.onChange}
                                            onBlur={this.props.onBlur}
                                            onFocus={this.props.onFocus}
                                            values={this.props.parentDepartments}
                                            defaultValue={this.props.selectedDepartment}
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
        
DepartmentForm.propTypes = {
    department: PropTypes.instanceOf(Object),
    validationErrors: PropTypes.instanceOf(Object),
    parentDepartments: PropTypes.instanceOf(Object),
    formName: PropTypes.string,
    goToList: PropTypes.func,
    isSaving: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    submitButtonCaption: PropTypes.string
};

export default DepartmentForm;