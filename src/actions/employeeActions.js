import { employeeService } from '../services/employeeService';
import { employeeConstants } from '../types/employeeConstants';
import history from '../utils/history';

export const employeeActions = {
    getAllEmployees,
    getEmployeeById,
    getEmployeeProfileById,
    createEmployee,
    deleteEmployeeById,
    deleteEmployeePhoto,
    updateEmployee,
    updateEmployeeField,
    updateEmployeePhoto
};

function getEmployeeProfileById(id) {
    return dispatch => {
        dispatch(request());
        employeeService.getProfileById(id)
            .then(
                employee => {
                    dispatch(success(employee));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.GET_EMPLOYEE_PROFILE_REQUEST }; }
    function success(employee) { return { type: employeeConstants.GET_EMPLOYEE_PROFILE_SUCCESS, employee }; }
    function failure(error) { return { type: employeeConstants.GET_EMPLOYEE_PROFILE_FAILURE, error }; }
}

function getAllEmployees() {
    return dispatch => {
        dispatch(request());
        employeeService.getAll()
            .then(
                employees => {
                    dispatch(success(employees));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.GET_ALL_EMPLOYEES_REQUEST }; }
    function success(employees) { return { type: employeeConstants.GET_ALL_EMPLOYEES_SUCCESS, employees }; }
    function failure(error) { return { type: employeeConstants.GET_ALL_EMPLOYEES_FAILURE, error }; }
}

function getEmployeeById(id) {
    return dispatch => {
        dispatch(request());
        employeeService.getById(id)
            .then(
                employee => {
                    dispatch(success(employee));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.GET_EMPLOYEE_REQUEST }; }
    function success(employeeData) { return { type: employeeConstants.GET_EMPLOYEE_SUCCESS, employeeData }; }
    function failure(error) { return { type: employeeConstants.GET_EMPLOYEE_FAILURE, error }; }
}

function createEmployee(employee) {
    return dispatch => {
        dispatch(request());
        employeeService.create(employee)
            .then(
                result => {
                    dispatch(success());
                    history.push('/employees');
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.CREATE_EMPLOYEE_REQUEST }; }
    function success() { return { type: employeeConstants.CREATE_EMPLOYEE_REQUEST }; }
    function failure(error) { return { type: employeeConstants.CREATE_EMPLOYEE_FAILURE, error }; }
}

function deleteEmployeeById(id) {
    return dispatch => {
        dispatch(request());
        employeeService._delete(id)
            .then(
                result => {
                    dispatch(success(id));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.DELETE_EMPLOYEE_REQUEST }; }
    function success(employeeId) { return { type: employeeConstants.DELETE_EMPLOYEE_SUCCESS, employeeId }; }
    function failure(error) { return { type: employeeConstants.DELETE_EMPLOYEE_FAILURE, error }; }
}

function updateEmployee(id, employee) {
    return dispatch => {
        dispatch(request());
        employeeService.update(id, employee)
            .then(
                result => {
                    dispatch(success());
                    history.push('/employees');
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.UPDATE_EMPLOYEE_REQUEST }; }
    function success() { return { type: employeeConstants.UPDATE_EMPLOYEE_SUCCESS }; }
    function failure(error) { return { type: employeeConstants.UPDATE_EMPLOYEE_FAILURE, error }; }
}

function updateEmployeeField(fieldName, value) {
    const fieldState = { name: fieldName, value: value };
    return { type: employeeConstants.UPDATE_EMPLOYEE_FIELD, fieldState };
}


function updateEmployeePhoto(id, imageData) {
    return dispatch => {
        dispatch(request());
        employeeService.updatePhoto(id, imageData)
            .then(
                photo => {
                    dispatch(success(photo));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.UPDATE_EMPLOYEE_PHOTO_REQUEST }; }
    function success(photo) { return { type: employeeConstants.UPDATE_EMPLOYEE_PHOTO_SUCCESS, photo }; }
    function failure(error) { return { type: employeeConstants.UPDATE_EMPLOYEE_PHOTO_FAILURE, error }; }
}

function deleteEmployeePhoto(id) {
    return dispatch => {
        dispatch(request());
        employeeService.deletePhoto(id)
            .then(
                result => {
                    dispatch(success());
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: employeeConstants.DELETE_EMPLOYEE_PHOTO_REQUEST }; }
    function success() { return { type: employeeConstants.DELETE_EMPLOYEE_PHOTO_SUCCESS }; }
    function failure(error) { return { type: employeeConstants.DELETE_EMPLOYEE_PHOTO_FAILURE, error }; }
}