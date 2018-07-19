import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

let Login = ({ loginMessage, onLoginClick, redirectToReferrer, ...props }) => {
    let usernameField, passwordField

    let onSubmit = e => {
        e.preventDefault();
        onLoginClick({
            username: usernameField.value,
            password: passwordField.value
        })
    }

    const { from } = props.location.state || { from: { pathname: '/' } }

    if (redirectToReferrer) {
        return (
            <Redirect to={from} />
        )
    }

    return (
        <form onSubmit={onSubmit}>
            {from !== '/' &&
                <span> You must log in to view the page.</span>
            }
            <fieldset>
                <label htmlFor="usernameField">Username</label>
                <input
                    type="text"
                    name="username"
                    id="usernameField"
                    ref={node => { usernameField = node }}
                />
                <label htmlFor="passwordField">Password</label>
                <input
                    type="password"
                    name="password"
                    id="passwordField"
                    ref={node => { passwordField = node }}
                />
                <button type="submit">Login</button>
                <span className='error'>{loginMessage}</span>
            </fieldset>
        </form>
    )
}


export default Login