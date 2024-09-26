import { showMessage } from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message,
        style: {
            marginTop: 45,

        },
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message,
        style: {

            marginTop: 45,


        },
    })
}

const truncateText = (text, length) => {
    if (text && text.length > length) {
        return text.slice(0, length) + '...'
    } else {
        return text
    };
}


export {
    showError,
    showSuccess,
    truncateText
}