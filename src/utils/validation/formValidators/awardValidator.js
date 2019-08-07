import { isFieldCorrect } from '../validationFunctions';
import { isNotRequiredFieldCorrect } from '../validationFunctions';

export const awardValidator = {
    name: isAwardNameCorrect,
    description: isAwardDescriptionCorrect
};

function isAwardNameCorrect(name) {
    return isFieldCorrect(name, 3, 40);
}

function isAwardDescriptionCorrect(description) {
    return isNotRequiredFieldCorrect(description, 300);
}