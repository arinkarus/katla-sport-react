export const checkAspectRatio = (w, h) => {
    let result = { isCorrect: false, message: "" };
    if (w !== h) {
        result.message = "You should pass square photo";
        return result;
    }
    if (w < 200) {
        result.message = "You should pass photo that is min 200x200";
        return result;
    }
    result.message = "";
    result.isCorrect = true;
    return result;
};

export const checkImageSize = (size) => {
    let result = { isCorrect: false, message: "" };
    if (size > 1) {
        result.message = "Choose an image with size < 1 MB";
        return result;
    }
    result.message = "";
    result.isCorrect = true;
    return result;
};