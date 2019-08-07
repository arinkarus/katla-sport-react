import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer
} from 'mdbreact';
import history from '../../utils/history';
import DepartmentForm from '../../components/forms/DepartmentForm';
import LoadingGif from '../../components/loading/LoadingGif';
import { departmentActions } from '../../actions/departmentActions';
import { departmentValidator } from '../../utils/validation/formValidators/departmentValidator';
import { isFormValid } from '../../utils/validation/validationFunctions';

class EditDepartmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validationErrors: {
                name: "",
                description: "",
                parentId: ""
            }
        };
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnSubmitForm = this.handleOnSubmitForm.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    componentDidMount() {
        this.props.getDepartmentById(this.props.match.params.id);
    }

    handleOnSubmitForm(e) {
        e.preventDefault();
        const { validationErrors } = this.state;
        const department = this.props.department;
        Object.keys(department).forEach(key => {
            if (key in departmentValidator) {
                validationErrors[key] = departmentValidator[key](department[key]);
            }
        });
        if (isFormValid(validationErrors)) {
            const id = this.props.match.params.id;
            this.props.updateDepartment(id, this.props.department);
        }
        this.setState({
            validationErrors: Object.create(validationErrors)
        });
    }

    handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.props.updateDepartmentField(name, value);
    }

    handleGoToList() {
        history.push("/departments");
    }

    handleOnBlur(event) {
        const { name, value } = event.target;
        const errorValue = departmentValidator[name](value);
        let validationErrors = this.state.validationErrors;
        validationErrors[name] = errorValue;
        this.setState({
            validationErrors: Object.create(validationErrors)
        });
    }

    handleOnFocus(event) {
        const name = event.target.name;
        let validationErrors = this.state.validationErrors;
        validationErrors[name] = "";
        this.setState({
            validationErrors: Object.create(validationErrors)
        });
    }

    render() {
        return (<MDBContainer>
            {this.props.loading && <LoadingGif />}
            {this.props.department &&
                <DepartmentForm
                    mode="edit"
                    onSubmit={this.handleOnSubmitForm}
                    onFocus={this.handleOnFocus}
                    onChange={this.handleOnChange}
                    onBlur={this.handleOnBlur}
                    formName="Edit department"
                    department={this.props.department}
                    parentDepartments={this.props.department.parentDepartments}
                    isSaving={this.props.isUpdating}
                    submitButtonCaption="Submit updating"
                    goToList={this.handleGoToList}
                    selectedDepartment={this.props.department.parentId}
                    validationErrors={this.state.validationErrors} />}
        </MDBContainer>);
    }
}

function mapStateToProps(state) {
    const { loading, department, isUpdating } = state.departments;
    return {
        loading, department, isUpdating
    };
}

export default connect(mapStateToProps, departmentActions)(EditDepartmentPage);