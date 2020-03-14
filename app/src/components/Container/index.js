import React from 'react'

const Container = ({ className, ...rest }) => (
  <div className={"container " + (className ? className : '')} {...rest} />
)

export default Container