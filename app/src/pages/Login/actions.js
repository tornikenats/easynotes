import { fetchNotes } from 'components/Notes/actions'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECIEVE_LOGIN = 'RECIEVE_LOGIN'
export const RECIEVE_LOGOUT = 'RECIEVE_LOGOUT'
export const FAILED_LOGIN = 'FAILED_LOGIN'

export const requestedLogin = () => ({
    type: REQUEST_LOGIN,
})

export const receiveLogin = json => ({
    type: RECIEVE_LOGIN,
    payload: {
        isAuthenticated: json.authenticated,
        user: json.user
    }
})

export const recieveLogout = () => ({
    type: RECIEVE_LOGOUT,
})

export const checkLoggedIn = () => {
    return dispatch => {
        return fetch('/api/v1/auth/status', {
            credentials: 'same-origin'
        })
            .then(resp => resp.json())
            .then(json => {
                if (json.authenticated) {
                    dispatch(fetchNotes())
                }
                dispatch(receiveLogin(json))
            })
    }
}

export const login = (creds) => {
    return dispatch => {
        dispatch(requestedLogin())
        return fetch('/api/v1/auth/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'username': creds.username,
                'secret': creds.password
            })
        })
            .then(resp => {
                if (resp.status == 401) {
                    return dispatch(failedLogin("Invalid credentials"))
                }
                return resp.json()
            })
            .then(json => {
                if (json.authenticated) {
                    dispatch(fetchNotes())
                }
                dispatch(receiveLogin(json))
            })

    }
}

export const failedLogin = msg => ({
    type: FAILED_LOGIN,
    payload: new Error(msg),
    error: true
})

export const sendRequestLogout = () => {
    return dispatch => {
        return fetch('/api/v1/auth/logout', {
            method: 'POST',
            credentials: 'same-origin',
        })
            .then(resp => resp.json())
            .then(json => dispatch(recieveLogout()))
    }
}