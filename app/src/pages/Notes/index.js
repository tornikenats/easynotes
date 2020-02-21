import React from 'react'
import PropTypes from 'prop-types'
import NoteContainer from './Note'
import { connect } from 'react-redux'
import EntryContainer from 'pages/Entry'
import List from './List'
import injectReducer from 'utils/injectReducer'
import reducer from './reducer'
import { compose } from 'redux'
import Header from 'pages/Header'
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

const equalityTest = currentEntry => note => {
    if (!currentEntry) return true
    let noteContent = note.tags.join(' ').toLowerCase()
    return contains(currentEntry, noteContent)
}

const contains = (entry, target) => {
    let entryTokens = entry.toLowerCase().split(' ')
    return entryTokens.every(token => target.indexOf(token) != -1)
}

const mapStateToProps = state => ({
    notes: state.note.notes
        .filter(note => equalityTest(state.note.filter)(note))
        .sort((a, b) => b.ts - a.ts)
})
const withConnect = connect(mapStateToProps)

const withReducer = injectReducer({ key: 'note', reducer })

export default compose(
    withReducer,
    withConnect
)(NoteList)