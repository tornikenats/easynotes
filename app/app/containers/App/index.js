import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotesContainer from 'containers/Notes'
import Login from 'containers/Login'
import PrivateRoute from 'utils/PrivateRoute'

const App = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={NotesContainer} />
    </Switch>
)

export default App