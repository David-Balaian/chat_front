let initialState={
    user:null, 
    selectedChannel:null
}

export default function(state=initialState, action){
    switch (action.type) {
        case "SELECT_CHANNEL":
            return {...state, selectedChannel: action.payload}
        case "LOG_IN":
            return {...state, user: action.payload}
        case "LOG_OUT":
            return {...state, user: null}
        default:
            return state;
    }
}