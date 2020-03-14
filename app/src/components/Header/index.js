import React from 'react'
import { sendRequestLogout } from 'pages/Login/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Container from 'components/Container'
import Button from 'components/Button'

let Header = ({ user, isAuthenticated, logout }) => {
    return (
        <header className="navbar my-2">
            <section className="navbar-section">
                <a href="..." className="navbar-brand mr-2">Easy Notes</a>
            </section>
            <section className="navbar-section">
                {isAuthenticated && user &&
                    <div className="btns d-flex" style={{ alignItems: 'center' }}>
                        <span className="mr-2">user</span>
                        <span className="btn btn-primary" onClick={logout}>Logout</span>
                    </div>
                }
            </section>
        </header>
    )
}

const mapStateToProps = state => ({
    auth: state.global.user.currentUser,
    isAuthenticated: state.global.user.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(sendRequestLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)