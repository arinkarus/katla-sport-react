import { departmentConstants } from '../../types/departmentConstants';
import { employeeConstants } from '../../types/employeeConstants';

export function departments (state = {}, action) {
    switch (action.type) {
        case departmentConstants.GET_ALL_DEPARTMENTS_REQUEST: {
            return { loading: true };
        }

        case departmentConstants.GET_ALL_DEPARTMENTS_SUCCESS: {
            return { departments: action.departments };
        }

        case departmentConstants.GET_DEPARTMENT_REQUEST: {
            return { loading: true };
        }

        case departmentConstants.GET_DEPARTMENT_SUCCESS: {
            return { department: action.department };
        }
        
        case departmentConstants.DELETE_DEPARTMENT_REQUEST: {
            return { ...state };
        }

        case departmentConstants.DELETE_DEPARTMENT_SUCCESS: {
            let departments = state.departments.filter(d => d.id !== action.id);
            return { ...state, departments: departments };
        }

        case departmentConstants.DELETE_CHILD_DEPARTMENT_SUCCESS: {
            let departments = state.departments.filter(d => d.id !== action.departmentInfo.parentId);
            const department = state.departments.find(d => d.id === action.departmentInfo.parentId);
            const updatedDepartment = {
                ...department,
                childDepartments: department.childDepartments.filter(ch => ch.id !== action.departmentInfo.id)
            };
            departments.push(updatedDepartment);
            departments.sort((a, b) => a.id - b.id);
            return { ...state, departments: departments };
        } 

        case departmentConstants.GET_PARENT_DEPARTMENTS_REQUEST: {
            return { loading: true };
        }

        case departmentConstants.GET_PARENT_DEPARTMENTS_SUCCESS: {
            return { parentDepartments: action.departments };
        }

        case departmentConstants.GET_CHILD_DEPARTMENTS_REQUEST: {
            return { ...state, loadingChildCategories: true };
        } 

        case departmentConstants.GET_CHILD_DEPARTMENTS_SUCCESS: {
            return { ...state, loadingChildCategories: false, childDepartments: action.departments };
        }

        case departmentConstants.CREATE_DEPARTMENT_REQUEST: {
            return { ...state, isCreating: true }; 
        }

        case departmentConstants.CREATE_DEPARTMENT_SUCCESS: {
            return { ...state };
        }

        case departmentConstants.UPDATE_DEPARTMENT_REQUEST: {
            return { ...state, isUpdating: true };
        }

        case departmentConstants.UPDATE_DEPARTMENT_SUCCESS: {
            return { ...state };
        }

        case departmentConstants.UPDATE_DEPARTMENT_FIELD: {
            let department = state.department;
            department[action.fieldState.name] = action.fieldState.value;
            return { ...state, department: department };
        }

        case departmentConstants.CLEAR_CHILD_DEPARTMENTS: {
            return { ...state, childDepartments: null };
        } 

        case employeeConstants.GET_EMPLOYEE_SUCCESS: {
            return {
                ...state, childDepartments: action.employeeData.childDepartments,
                parentDepartments: action.employeeData.parentDepartments
            };
        }

        default: {
            return state;
        }
    }
}
