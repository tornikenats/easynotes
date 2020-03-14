import React from 'react'
import PropTypes from 'prop-types'
import NoteContainer from './Note'
import { connect } from 'react-redux'
import reducer from './reducer'
import { compose } from 'redux'

const NoteList = ({ notes }) => (
    <div>
        {notes.map(note =>
            <NoteContainer
                key={note.ts}
                note={note}
            />
        )}
    </div>
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

export default compose(
    withConnect
)(NoteList)