import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './pages/_app'
import { checkLoggedIn } from './pages/Login/actions'
import { BrowserRouter as Router } from 'react-router-dom'
import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-exp.min.css'
import 'spectre.css/dist/spectre-icons.min.css'
import './styles.scss'

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