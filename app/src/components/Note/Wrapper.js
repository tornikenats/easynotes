import styled from 'styled-components'
import Edit from 'components/Edit'

const NoteWrapper = styled.li`
  display: flex;
  align-items: center;
  min-height: 2.4rem;
  line-height: 1.6rem;
  margin-bottom: 0.6rem;
  margin-left: .4rem;

  &:hover ${Edit} {
    color: #9b4dca;
  }
`

export default NoteWrapper