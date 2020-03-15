import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import H3 from 'components/H3'
import Form from 'components/Form'
import Button from 'components/Button'
import styled from 'styled-components'

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
`

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
        <LoginWrapper>
            <H3>Easy Notes</H3>
            <Form onSubmit={onSubmit} className="text-center">
                <div className="form-group mb-2">
                    <input
                        className="form-input mb-1"
                        type="text"
                        name="username"
                        id="usernameField"
                        placeholder="Username"
                        ref={node => { usernameField = node }}
                    />
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        id="passwordField"
                        placeholder="Password"
                        ref={node => { passwordField = node }}
                    />
                </div>
                <Button type="submit">Login</Button>
                <span className='error'>{loginMessage}</span>
            </Form>
        </LoginWrapper>
    )
}


export default Login