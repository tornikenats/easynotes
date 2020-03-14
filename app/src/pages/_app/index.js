import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from 'pages/Home'
import Login from 'pages/Login'
import PrivateRoute from 'utils/PrivateRoute'

const App = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={Home} />
    </Switch>
)

export default App