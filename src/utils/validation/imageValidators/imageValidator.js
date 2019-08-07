export const imageValidator = {
    validate: isImageCorrect
};

const allowedMimeTypes = ["image/jpeg", "image/png"];

async function isImageCorrect(aspectRatioCheck, imageSizeCheck, file, content) {
    let result = { isCorrect: false, message: "" };
    if (!allowedMimeTypes.includes(file.type)) {
        result.message = "Please select an image";
        return await Promise.resolve(result);
    }
    result = imageSizeCheck(file.size / 1000000);
    if (!result.isCorrect) {
        return await Promise.resolve(result);
    }
    const size = await createImage(content);
    result = aspectRatioCheck(size.width, size.height);
    if (!result.isCorrect) {
        return await Promise.resolve(result);
    }
    return await Promise.resolve(result);
}

function createImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = src;
    });
}