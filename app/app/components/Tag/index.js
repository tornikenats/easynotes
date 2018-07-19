import React from 'react'
import styled from 'styled-components'

const TagWrapper = styled.span`
  border-radius: .4rem;
  padding: .4rem;
  margin-right: .3rem;
  background: lightblue;
  color: black;
`

const Tag = ({ text }) => (
  <TagWrapper>{text}</TagWrapper>
)


export default Tag