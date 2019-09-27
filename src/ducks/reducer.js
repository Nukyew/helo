const initialState = {
    username: '',
    id: null,
    profile_pic: ''
}

const HANDLE_USER = "HANDLE_USER"

export const handleUser = (userId, username, profile_pic) => {
    let user = {userId, username, profile_pic}
    return {
        type: HANDLE_USER,
        payload: user
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case HANDLE_USER:
            return {...state, username: action.payload.username, id: action.payload.userId, profile_pic: action.payload.profile_pic}
        default:
            return state
    }
}

export default reducer