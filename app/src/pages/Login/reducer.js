import {
    RECIEVE_LOGIN,
    REQUEST_LOGIN,
    RECIEVE_LOGOUT,
    FAILED_LOGIN
} from './actions'

export const initialState = {
    isFetching: false,
    error: false,
    currentUser: {},
    auth: {
        isAuthenticated: false,
        redirectToReferrer: false
    },
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                auth: {
                    ...state.auth,
                    isAuthenticated: false
                }
            })
        case RECIEVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                currentUser: action.payload.user,
                auth: {
                    ...state.auth,
                    isAuthenticated: action.payload.isAuthenticated,
                    redirectToReferrer: action.payload.isAuthenticated
                }
            })
        case RECIEVE_LOGOUT:
            return Object.assign({}, state, {
                isFetching: false,
                currentUser: {},
                auth: {
                    ...state.auth,
                    isAuthenticated: false,
                    redirectToReferrer: false
                }
            })
        case FAILED_LOGIN:
            return Object.assign({}, state, {
                error: action.payload.message
            })
        default:
            return state
    }
}