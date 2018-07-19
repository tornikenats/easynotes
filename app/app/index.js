import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from 'containers/App'
import { checkLoggedIn } from 'containers/Login/actions'
import { BrowserRouter as Router } from 'react-router-dom'

import './global-styles'
require('milligram/dist/milligram.min.css')
import 'sanitize.css'

const store = configureStore()

export default class Root extends Component {
    componentWillMount() {
        store.dispatch(checkLoggedIn())
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        )
    }
}

render(
    <Root />,
    document.getElementById('app')
)