import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotesContainer from 'pages/Notes'
import Login from 'pages/Login'
import PrivateRoute from 'utils/PrivateRoute'

const App = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={NotesContainer} />
    </Switch>
)

export default App