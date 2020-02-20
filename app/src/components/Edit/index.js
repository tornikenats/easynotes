import styled from 'styled-components'

const Edit = styled.span`
    ${({ active }) => active && `
    color: orange !important
    `}

    &::before {
        content: '\\25CF\\25CF\\25CF';
        font-size: 10px;
        cursor: pointer;
        padding-right: .5rem;
    }

    &:hover {
        color: #9b4dca;
    }
`

export default Edit