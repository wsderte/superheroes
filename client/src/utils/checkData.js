export function checkData(state, selectedImages) {
    if(state.nickname && state.real_name && state.origin_description 
        && state.superpowers && state.catch_phrase && (selectedImages[0] || state.images[0])){
        return true;
    }

    return false
}
