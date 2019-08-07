import { departmentService } from '../services/departmentService';
import { departmentConstants } from '../types/departmentConstants';
import history from '../utils/history';

export const departmentActions = {
    getParentDepartments,
    getDepartmentById,
    getAllDepartments,
    getChildsDepartments,
    deleteParentDepartmentById,
    deleteChildDepartmentById,
    createDepartment,
    updateDepartment,
    updateDepartmentField,
    clearChildDepartments
};

function getAllDepartments() {
    return dispatch => {
        dispatch(request());
        departmentService.getAll()
            .then(
                departments => {
                    dispatch(success(departments));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.GET_ALL_DEPARTMENTS_REQUEST }; }
    function success(departments) { return { type: departmentConstants.GET_ALL_DEPARTMENTS_SUCCESS, departments }; }
    function failure(error) { return { type: departmentConstants.GET_ALL_DEPARTMENTS_FAILURE, error }; }
}

function getDepartmentById(id) {
    return dispatch => {
        dispatch(request());
        departmentService.getById(id)
            .then(
                department => {
                    dispatch(success(department));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.GET_DEPARTMENT_REQUEST }; }
    function success(department) { return { type: departmentConstants.GET_DEPARTMENT_SUCCESS, department }; }
    function failure(error) { return { type: departmentConstants.GET_DEPARTMENT_FAILURE, error }; }
}

function getParentDepartments() {
    return dispatch => {
        dispatch(request());
        departmentService.getParents()
            .then(
                departments => {
                    dispatch(success(departments));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.GET_PARENT_DEPARTMENTS_REQUEST }; }
    function success(departments) { return { type: departmentConstants.GET_PARENT_DEPARTMENTS_SUCCESS, departments }; }
    function failure(error) { return { type: departmentConstants.GET_PARENT_DEPARTMENTS_FAILURE, error }; }
}

function getChildsDepartments(id) {
    return dispatch => {
        dispatch(request());
        departmentService.getChilds(id)
            .then(
                departments => {
                    dispatch(success(departments));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.GET_CHILD_DEPARTMENTS_REQUEST }; }
    function success(departments) { return { type: departmentConstants.GET_CHILD_DEPARTMENTS_SUCCESS, departments }; }
    function failure(error) { return { type: departmentConstants.GET_CHILD_DEPARTMENTS_FAILURE, error }; }
}

function deleteParentDepartmentById(id) {
    return dispatch => {
        dispatch(request());
        departmentService._delete(id)
            .then(
                result => {
                    dispatch(success(id));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.DELETE_DEPARTMENT_REQUEST }; }
    function success(id) { return { type: departmentConstants.DELETE_DEPARTMENT_SUCCESS, id }; }
    function failure(error) { return { type: departmentConstants.DELETE_DEPARTMENT_FAILURE, error }; }
}

function deleteChildDepartmentById(id, parentId) {
    return dispatch => {
        dispatch(request());
        departmentService._delete(id)
            .then(
                result => {
                    const departmentInfo = { id: id, parentId: parentId };
                    dispatch(success(departmentInfo));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.DELETE_CHILD_DEPARTMENT_REQUEST }; }
    function success(departmentInfo) { return { type: departmentConstants.DELETE_CHILD_DEPARTMENT_SUCCESS, departmentInfo }; }
    function failure(error) { return { type: departmentConstants.DELETE_CHILD_DEPARTMENT_FAILURE, error }; }
}

function createDepartment(department) {
    return dispatch => {
        dispatch(request());
        departmentService.create(department)
            .then(
                departments => {
                    dispatch(success(departments));
                    history.push("/departments");
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.CREATE_DEPARTMENT_REQUEST }; }
    function success(departments) { return { type: departmentConstants.CREATE_DEPARTMENT_SUCCESS, departments }; }
    function failure(error) { return { type: departmentConstants.CREATE_DEPARTMENT_FAILURE, error }; }
}

function updateDepartmentField(fieldName, value) {
    const fieldState = { name: fieldName, value: value };
    return { type: departmentConstants.UPDATE_DEPARTMENT_FIELD, fieldState };
}

function clearChildDepartments() {
    return { type: departmentConstants.CLEAR_CHILD_DEPARTMENTS };
}

function updateDepartment(id, department) {
    return dispatch => {
        dispatch(request());
        departmentService.update(id, department)
            .then(
                departments => {
                    dispatch(success(departments));
                    history.push("/departments");
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: departmentConstants.UPDATE_DEPARTMENT_REQUEST }; }
    function success(departments) { return { type: departmentConstants.UPDATE_DEPARTMENT_SUCCESS, departments }; }
    function failure(error) { return { type: departmentConstants.UPDATE_DEPARTMENT_FAILURE, error }; }
}
