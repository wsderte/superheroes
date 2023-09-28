export function generateForm(state, selectedImages) {
    let formData = new FormData();

    formData.append("nickname", state.nickname)
    formData.append("real_name", state.real_name)
    formData.append("origin_description", state.origin_description)
    formData.append("superpowers", state.superpowers)
    formData.append("catch_phrase", state.catch_phrase)
    formData.append("images", state.images)
    selectedImages.forEach((image, index) => {
        formData.append(`image`, image[1]);
    });

    return formData
}
