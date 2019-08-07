import { isFieldCorrect } from '../validationFunctions';
import { isNotRequiredFieldCorrect } from '../validationFunctions';

export const employeeValidator = {
    name: isEmployeeNameCorrect,
    surname: isEmployeeSurnameCorrect,
    about: isEmployeeAboutCorrect,
    parentDepartmentId: isDepartmentSelected,
    departmentId: isDepartmentSelected,
    email: isEmailCorrect
};

function isEmployeeNameCorrect(name) {
    return isFieldCorrect(name, 3, 40);
}

function isEmployeeSurnameCorrect(surname) {
    return isFieldCorrect(surname, 3, 40);
}

function isEmployeeAboutCorrect(about) {
    return isNotRequiredFieldCorrect(about, 300);
}

function isDepartmentSelected(value) {
    if (!value) {
        return "Select department";
    }
    return "";
}

function isEmailCorrect(email) {
    const result = isFieldCorrect(email, 4, 125);
    if (result.length !== 0) {
        return result;
    }
    var regExpression = /\S+@\S+\.\S+/;
    if (!regExpression.test(email)) {
        return "Input correct email";
    }
    return "";
}