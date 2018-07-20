import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button.attrs({
    isFullWidth: props => props.isFullWidth || false
})`
    margin: 0;
    ${props => props.isFullWidth && 'width: 100%;'}
`

Button.propTypes = {
    isFullWidth: PropTypes.bool
}

export default Button