import { fromJS } from 'immutable'
import {
    RECIEVE_LOGIN,
    REQUEST_LOGIN,
    RECIEVE_LOGOUT,
    FAILED_LOGIN
} from './actions'

export const initialState = fromJS({
    isFetching: false,
    error: false,
    currentUser: {},
    auth: {
        isAuthenticated: false,
        redirectToReferrer: false
    },
})

export default function auth(state = initialState, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return state
                .set('isFetching', true)
                .set('error', false)
                .setIn(['auth', 'isAuthenticated'], false)
        case RECIEVE_LOGIN:
            return state
                .set('isFetching', false)
                .setIn(['auth', 'isAuthenticated'], action.payload.isAuthenticated)
                .setIn(['auth', 'redirectToReferrer'], action.payload.isAuthenticated)
                .set('currentUser', action.payload.user)
        case RECIEVE_LOGOUT:
            return state
                .set('isFetching', false)
                .setIn(['auth', 'isAuthenticated'], false)
                .setIn(['auth', 'redirectToReferrer'], false)
                .set('currentUser', {})
        case FAILED_LOGIN:
            return state.set('error', action.payload.message)
        default:
            return state
    }
}