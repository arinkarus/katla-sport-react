export function isFieldCorrect(field, minLength = 0, maxLength = 256) {
    console.log("is fir");
    if (field.trim().length === 0) {
        return "Field is required!";
    }
    if (minLength !== 0 && field.length <= minLength) {
        return "Field's length has to be greater than " + minLength + " symbols";
    }
    if (field.length > maxLength) {
        return "Field's length has to be less than  " + maxLength + " symbols";
    }
    return "";
}


export function isNotRequiredFieldCorrect(field, maxLength = 256) {
    console.log(field);
    if (field === null) {
        return "";
    }
    console.log(field.length);
    if (field.length > maxLength) {
        return "Field's length has to be less than  " + maxLength + " symbols";
    }
    return "";
}

export function isFormValid(errors) {
    let valid = true;
    Object.values(errors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}

