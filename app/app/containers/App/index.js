import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotesContainer from 'containers/Notes'
import Header from 'containers/Header'
import Login from 'containers/Login'
import styled from 'styled-components'
import Container from 'components/Container'
import PrivateRoute from 'utils/PrivateRoute'

const AppWrapper = styled.div`
  padding-top: 5rem;
`

const App = () => (
    <AppWrapper>
        <Container>
            <Header />

            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" component={NotesContainer} />
            </Switch>
        </Container>
    </AppWrapper>
)

export default App