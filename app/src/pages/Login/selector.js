import { createSelector } from 'reselect'
import { initialState } from './reducer'


const selectUser = state => state.get('user', initialState)
const selectAuth = state => state.getIn(['global', 'user', 'auth'], initialState)

const makeSelectAuth = () =>
    createSelector(selectUser, userState => userState.get('auth'))

const makeSelectCurrentUser = () =>
    createSelector(selectUser, userState => userState.get('currentUser'))

const makeSelectLoginError = () =>
    createSelector(selectUser, userState => userState.get('error'))

const makeSelectIsAuthenticated = () =>
    createSelector(selectAuth, auth => auth.get('isAuthenticated'))

const makeSelectShouldRedirect = () =>
    createSelector(selectAuth, auth => auth.get('redirectToReferrer'))



export { selectUser, makeSelectAuth, makeSelectIsAuthenticated, makeSelectCurrentUser, makeSelectLoginError, makeSelectShouldRedirect }
