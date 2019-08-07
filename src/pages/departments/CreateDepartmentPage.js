import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer
} from 'mdbreact';
import history from '../../utils/history';
import LoadingGif from '../../components/loading/LoadingGif';
import DepartmentForm from '../../components/forms/DepartmentForm';
import { departmentActions } from '../../actions/departmentActions';
import { departmentValidator } from '../../utils/validation/formValidators/departmentValidator';
import { isFormValid } from '../../utils/validation/validationFunctions';

class CreateDepartmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department: {
                name: "",
                description: "",
                parentId: null
            },
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
        this.props.getParentDepartments();
    }

    handleOnSubmitForm(e) {
        e.preventDefault();
        const { department, validationErrors } = this.state;
        Object.keys(department).forEach(key => {
            validationErrors[key] = departmentValidator[key](department[key]);
        });
        if (isFormValid(validationErrors)) {
            this.props.createDepartment(this.state.department);
        }
        this.setState({
            validationErrors: Object.create(validationErrors)
        });
    }

    handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const { department } = this.state;
        this.setState({
            department: {
                ...department,
                [name]: value
            }
        });
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
            {this.props.parentDepartments &&
                <DepartmentForm
                    mode={"save"}
                    onSubmit={this.handleOnSubmitForm}
                    onFocus={this.handleOnFocus}
                    onChange={this.handleOnChange}
                    onBlur={this.handleOnBlur}
                    formName="Create new department"
                    department={this.state.department}
                    parentDepartments={this.props.parentDepartments}
                    isSaving={this.props.isCreating}
                    submitButtonCaption="Submit creating"
                    goToList={this.handleGoToList}
                    selectedDepartment={null}
                    validationErrors={this.state.validationErrors} />}
        </MDBContainer>);
    }
}

function mapStateToProps(state) {
    const { loading, parentDepartments, isCreating } = state.departments;
    return {
        loading, parentDepartments, isCreating
    };
}

export default connect(mapStateToProps, departmentActions)(CreateDepartmentPage);