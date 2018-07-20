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
            <H3>EasyNotes</H3>
            <Form onSubmit={onSubmit}>
                <fieldset>
                    <input
                        type="text"
                        name="username"
                        id="usernameField"
                        placeholder="Username"
                        ref={node => { usernameField = node }}
                    />
                    <input
                        type="password"
                        name="password"
                        id="passwordField"
                        placeholder="Password"
                        ref={node => { passwordField = node }}
                    />
                    <Button isFullWidth={true} type="submit">Login</Button>
                    <span className='error'>{loginMessage}</span>
                </fieldset>
            </Form>
        </LoginWrapper>
    )
}


export default Login