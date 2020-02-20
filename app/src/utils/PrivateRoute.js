import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectIsAuthenticated } from 'pages/Login/selector'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

const mapStateToProps = createStructuredSelector({
    isAuthenticated: makeSelectIsAuthenticated()
})

export default connect(mapStateToProps)(PrivateRoute)