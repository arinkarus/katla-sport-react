import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer
} from 'mdbreact';
import history from '../../utils/history';
import EmployeeForm from '../../components/forms/EmployeeForm';
import LoadingGif from '../../components/loading/LoadingGif';
import { bindActionCreators } from 'redux';
import { departmentActions } from '../../actions/departmentActions';
import { employeeActions } from '../../actions/employeeActions';
import { employeeValidator } from '../../utils/validation/formValidators/employeeValidator';
import { isFormValid } from '../../utils/validation/validationFunctions';

class CreateEmployeePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                name: "",
                surname: "",
                about: "",
                parentDepartmentId: null,
                departmentId: null,
                email: ""
            },
            validationErrors: {
                name: "",
                surname: "",
                about: "",
                departmentId: "",
                parentDepartmentId: "",
                email: ""
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

    handleGoToList() {
        history.push("/employees");
    }

    handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        if (name === "parentDepartmentId" && value) {
            this.props.getChildsDepartments(value);
        }
        const { employee } = this.state;
        this.setState({
            employee: {
                ...employee,
                [name]: value
            }
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

    handleOnBlur(event) {
        const { name, value } = event.target;
        const errorValue = employeeValidator[name](value);
        let validationErrors = this.state.validationErrors;
        validationErrors[name] = errorValue;
        this.setState({
            validationErrors: Object.create(validationErrors)
        });
    }

    handleOnSubmitForm(e) {
        e.preventDefault();
        const { employee, validationErrors } = this.state;
        Object.keys(employee).forEach(key => {
            validationErrors[key] = employeeValidator[key](employee[key]);
        });
        if (isFormValid(validationErrors)) {
            this.props.createEmployee(this.state.employee);
        }
        this.setState({
            validationErrors: Object.create(validationErrors)
        });
    }

    render() {
        return (<MDBContainer>
            {this.props.loading && <LoadingGif />}
            {this.props.parentDepartments &&
                <EmployeeForm
                    childDepartments={this.props.childDepartments}
                    isLoadingChildDepartments={this.props.loadingChildCategories}
                    employee={this.state.employee}
                    onSubmit={this.handleOnSubmitForm}
                    onFocus={this.handleOnFocus}
                    onChange={this.handleOnChange}
                    onBlur={this.handleOnBlur}
                    formName="Create new employee"
                    isSaving={this.props.isCreating}
                    submitButtonCaption="Submit creating"
                    goToList={this.handleGoToList}
                    parentDepartments={this.props.parentDepartments}
                    validationErrors={this.state.validationErrors} />
            }
        </MDBContainer>);
    }
}

function mapStateToProps(state) {
    const { loading, parentDepartments, loadingChildCategories, childDepartments } = state.departments;
    const { isCreating } = state.employees;
    return {
        loading, parentDepartments, loadingChildCategories, childDepartments, isCreating
    };
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        employeeActions,
        dispatch,
    ),
    getChildsDepartments: (parentId) =>
        dispatch(departmentActions.getChildsDepartments(parentId)),
    getParentDepartments: () =>
        dispatch(departmentActions.getParentDepartments())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployeePage);