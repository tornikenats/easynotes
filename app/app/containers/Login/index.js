import { connect } from 'react-redux'
import Login from './Login'
import { login } from './actions'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { makeSelectLoginError, makeSelectShouldRedirect } from './selector'

const mapStateToProps = createStructuredSelector({
    loginMessage: makeSelectLoginError(),
    redirectToReferrer: makeSelectShouldRedirect()
})

const mapDispatchToProps = dispatch => ({
    onLoginClick: (creds) => dispatch(login(creds))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
