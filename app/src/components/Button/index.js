import React from 'react'

const Button = ({ className, ...rest }) => <button className={"btn " + (className ? className : '')} {...rest} />


export default Button