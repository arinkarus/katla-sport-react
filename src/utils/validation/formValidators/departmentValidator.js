import { isFieldCorrect } from '../validationFunctions';
import { isNotRequiredFieldCorrect } from '../validationFunctions';

export const departmentValidator = {
    name: isDepartmentNameCorrect,
    description: isDepartmentDescriptionCorrect,
    parentId: isParentIdCorrect
};

function isDepartmentNameCorrect(name) {
    return isFieldCorrect(name, 3, 40);
}

function isDepartmentDescriptionCorrect(description) {
    return isNotRequiredFieldCorrect(description, 200);
}

function isParentIdCorrect(parentId) {
    return "";
}