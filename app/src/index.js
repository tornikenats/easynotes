import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './pages/App'
import { checkLoggedIn } from './pages/Login/actions'
import { BrowserRouter as Router } from 'react-router-dom'
import './global-styles'
import 'sanitize.css'
import 'milligram/dist/milligram.min.css'

const store = configureStore()

class Root extends Component {
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