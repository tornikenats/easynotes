import React from 'react'
import PropTypes from 'prop-types'
import NoteContainer from './Note'
import { connect } from 'react-redux'
import EntryContainer from 'containers/Entry'
import List from './List'
import { makeSelectNotes } from './selector'
import { createStructuredSelector } from 'reselect'
import injectReducer from 'utils/injectReducer'
import reducer from './reducer'
import { compose } from 'redux'
import Header from 'containers/Header'
import Container from 'components/Container'
import styled from 'styled-components'

const NoteWrapper = styled.div`
    margin-top: 5.2rem;
`

const NoteList = ({ notes }) => (
    <NoteWrapper>
        <Header />
        <Container>
            <EntryContainer />
            <List>
                {notes.map(note =>
                    <NoteContainer
                        key={note.ts}
                        note={note}
                    />
                )}
            </List>
        </Container>
    </NoteWrapper>
)

const mapStateToProps = createStructuredSelector({
    notes: makeSelectNotes()
})
const withConnect = connect(mapStateToProps)

const withReducer = injectReducer({ key: 'note', reducer })

export default compose(
    withReducer,
    withConnect
)(NoteList)