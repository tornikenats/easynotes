import { connect } from 'react-redux'
import Login from './Login'
import { login } from './actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
    redirectToReferrer: state.global.user.auth.redirectToReferrer,
    loginMessage: state.global.user.error
})

const mapDispatchToProps = dispatch => ({
    onLoginClick: (creds) => dispatch(login(creds))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
