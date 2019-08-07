import { employeeConstants } from '../../types/employeeConstants';

export function employees(state = {}, action) {
    switch (action.type) {
        case employeeConstants.GET_ALL_EMPLOYEES_REQUEST: {
            return { loading: true };
        }

        case employeeConstants.GET_ALL_EMPLOYEES_SUCCESS: {
            return { employees: action.employees };
        }

        case employeeConstants.CREATE_EMPLOYEE_REQUEST: {
            return { ...state, isCreating: true };
        }

        case employeeConstants.GET_EMPLOYEE_REQUEST: {
            return { ...state, loading: true };
        }

        case employeeConstants.GET_EMPLOYEE_SUCCESS: {
            return {
                ...state, loading: false, employee: action.employeeData.employee
            };
        }

        case employeeConstants.GET_EMPLOYEE_PROFILE_REQUEST: {
            return { ...state, loading: true };
        }

        case employeeConstants.GET_EMPLOYEE_PROFILE_SUCCESS: {
            return { ...state, loading: false, employeeProfile: action.employee };
        }

        case employeeConstants.CREATE_EMPLOYEE_SUCCESS: {
            return { ...state, isCreating: false };
        }

        case employeeConstants.UPDATE_EMPLOYEE_REQUEST: {
            return { ...state, isUpdating: true };
        }

        case employeeConstants.UPDATE_EMPLOYEE_SUCCESS: {
            return { isUpdating: false };
        }

        case employeeConstants.DELETE_EMPLOYEE_SUCCESS: {
            const employees = state.employees.filter(e => e.id !== action.employeeId);
            return { ...state, employees: employees };
        }     

        case employeeConstants.UPDATE_EMPLOYEE_PHOTO_REQUEST: {
            return { ...state, loadingPhoto: true };
        }

        case employeeConstants.UPDATE_EMPLOYEE_PHOTO_SUCCESS: {
            let employee = state.employeeProfile;
            employee.imagePath = action.photo.newPath;
            return { ...state, employeeProfile: employee, loadingPhoto: false };
        }

        case employeeConstants.DELETE_EMPLOYEE_PHOTO_SUCCESS: {
            let employee = state.employeeProfile;
            employee.imagePath = null;
            return { ...state, employeeProfile: employee, loadingPhoto: false };
        }

        case employeeConstants.DELETE_EMPLOYEE_PHOTO_REQUEST: {
            return { ...state, loadingPhoto: true };
        }

        case employeeConstants.UPDATE_EMPLOYEE_FIELD: {
            let employee = state.employee;
            employee[action.fieldState.name] = action.fieldState.value;
            return { ...state, employee: employee };
        }

        default: {
            return state;
        }
    }
}