import React from 'react';
import { connect } from 'react-redux';
import EmployeeForm from '../../components/forms/EmployeeForm';
import LoadingGif from '../../components/loading/LoadingGif';
import { bindActionCreators } from 'redux';
import {
    MDBContainer
} from 'mdbreact';
import { departmentActions } from '../../actions/departmentActions';
import { employeeActions } from '../../actions/employeeActions';
import { employeeValidator } from '../../utils/validation/formValidators/employeeValidator';
import { isFormValid } from '../../utils/validation/validationFunctions';
import history from '../../utils/history';

class EditEmployeePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const id = this.props.match.params.id;
        this.props.getEmployeeById(id);
    }

    handleGoToList() {
        history.push("employees");
    }

    handleOnSubmitForm(e) {
        e.preventDefault();
        const { validationErrors } = this.state;
        const employee = this.props.employee;
        Object.keys(employee).forEach(key => {
            validationErrors[key] = employeeValidator[key](employee[key]);
        });
        if (isFormValid(validationErrors)) {
            const employeeId = this.props.match.params.id;
            this.props.updateEmployee(employeeId, this.props.employee);
        }
        this.setState({
            validationErrors: Object.create(validationErrors)
        });
    }

    handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.props.updateEmployeeField(name, value);
        if (name === "parentDepartmentId") {
            if (!value) {
                this.props.clearChildDepartments();
            }
            this.props.getChildsDepartments(value);
        }
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

    render() {
        return (<MDBContainer>
            {this.props.loading && <LoadingGif />}
            {this.props.employee &&
                <EmployeeForm
                    childDepartments={this.props.childDepartments}
                    isLoadingChildDepartments={this.props.loadingChildCategories}
                    employee={this.props.employee}
                    onSubmit={this.handleOnSubmitForm}
                    onFocus={this.handleOnFocus}
                    onChange={this.handleOnChange}
                    onBlur={this.handleOnBlur}
                    formName="Update employee data"
                    isSaving={this.props.isUpdating}
                    submitButtonCaption="Submit updating"
                    goToList={this.handleGoToList}
                    parentDepartments={this.props.parentDepartments}
                    validationErrors={this.state.validationErrors} />
            }
        </MDBContainer>);
    };
}

function mapStateToProps(state) {
    const { parentDepartments, loadingChildCategories, childDepartments } = state.departments;
    const { isUpdating, loading,  employee } = state.employees;
    return {
        loading,
        parentDepartments,
        loadingChildCategories,
        childDepartments,
        isUpdating,
        employee
    };
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        employeeActions,
        dispatch,
    ),
    clearChildDepartments: () =>
        dispatch(departmentActions.clearChildDepartments()),
    getChildsDepartments: (parentId) =>
        dispatch(departmentActions.getChildsDepartments(parentId)),
    getParentDepartments: () =>
        dispatch(departmentActions.getParentDepartments())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeePage);