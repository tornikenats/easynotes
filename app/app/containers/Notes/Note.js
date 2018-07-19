import React from 'react'
import { connect } from 'react-redux'
import { deleteNote, selectNote } from './actions'
import Note from 'components/Note'
import { createStructuredSelector } from 'reselect'
import { makeSelectSelectedNote } from './selector';

const NoteContainer = ({ note, deleteNote, selectNote, selectedNote }) => {
    let isSelected = () => {
        return note && selectedNote && note._id === selectedNote._id
    }

    return (
        <Note 
            note={note}
            onDelete={deleteNote}
            onSelect={selectNote}
            active={isSelected()}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    selectedNote: makeSelectSelectedNote()
})

const mapDispatchToProps = dispatch => ({
    deleteNote: note => dispatch(deleteNote(note)),
    selectNote: note => dispatch(selectNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer)