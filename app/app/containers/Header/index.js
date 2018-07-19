import React from 'react'
import { sendRequestLogout } from 'containers/Login/actions'
import { connect } from 'react-redux'
import Navigation from './Navigation'
import Title from './Title'
import List from './List'
import Item from './Item'
import Container from 'components/Container'
import Button from 'components/Button'
import { createStructuredSelector } from 'reselect'
import { makeSelectIsAuthenticated, makeSelectCurrentUser } from 'containers/Login/selector'
let Header = ({ user, isAuthenticated, logout }) => {
    return (
        <Navigation>
            <Container>
                <Title>EasyNotes</Title>
                {isAuthenticated &&
                    <List>
                        <Item>
                            <span><strong>{user.username}</strong></span>
                        </Item>
                        <Item>
                            <Button onClick={logout}>Logout</Button>
                        </Item>
                    </List>
                }
                {!isAuthenticated &&
                    <List>
                        <Item>
                            <Button>Log In!</Button>
                        </Item>
                    </List>
                }
            </Container>
        </Navigation>
    )
}

const mapStateToProps = createStructuredSelector({
    isAuthenticated: makeSelectIsAuthenticated(),
    user: makeSelectCurrentUser()
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(sendRequestLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)