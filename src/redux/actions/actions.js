export const SELECT_CHANNEL = (id) => {
    return {
        type: "SELECT_CHANNEL",
        payload: id,
    }
}

export const LOG_IN = (user) => {
    return {
        type: "LOG_IN",
        payload: user,
    }
}

export const LOG_OUT = () => {
    return {
        type: "LOG_OUT",
    }
}