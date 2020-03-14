import notes from './api'
export const RECEIVE_ADD_NOTE = 'RECEIVE_ADD_NOTE'
export const RECEIVE_DELETE_NOTE = 'RECEIVE_DELETE_NOTE'
export const RECIEVE_NOTES = 'RECIEVE_NOTES'
export const RECEIVE_SELECT_NOTE = 'RECEIVE_SELECT_NOTE'
export const RECEIVE_UPDATE_NOTE = 'RECEIVE_UPDATE_NOTE'
export const UNSELECT_NOTE = 'UNSELECT_NOTE'
export const UPDATE_FILTER = 'UPDATE_FILTER'


export const receiveAddNote = note => ({
    type: RECEIVE_ADD_NOTE,
    payload: { note }
})

export const receiveDeleteNote = json => ({
    type: RECEIVE_DELETE_NOTE,
    payload: {
        deleted_id: json.deleted_id
    }
})

export const receiveNotes = notes => ({
    type: RECIEVE_NOTES,
    payload: {
        notes
    }
})

export const receiveSelectNote = note => ({
    type: RECEIVE_SELECT_NOTE,
    payload: {
        note
    }
})

export const receiveUpdateNote = (note, newNote) => ({
    type: RECEIVE_UPDATE_NOTE,
    payload: {
        oldNote: note,
        newNote: newNote
    }
})

export const unselectNote = () => ({
    type: UNSELECT_NOTE
})

export const fetchNotes = () => {
    return dispatch => {
        notes.getNotes()
            .then(notes => dispatch(receiveNotes(notes)))
    }
}

export const addNote = new_note => {
    return dispatch => {
        notes.addNote(new_note)
            .then(note => dispatch(receiveAddNote(note)))
    }
}
export const deleteNote = note => {
    return dispatch => {
        notes.deleteNote(note._id)
            .then(json => dispatch(receiveDeleteNote(json)))
    }
}
export const selectNote = note => {
    return dispatch => {
        dispatch(receiveSelectNote(note))
    }
}

export const updateNote = (note, newNote) => {
    return dispatch => {
        notes.updateNote(note._id, newNote)
            .then(newNote =>
                dispatch(receiveUpdateNote(note, newNote)))
    }
}

export const updateFilter = text => ({
    type: UPDATE_FILTER, 
    payload: {
        text
    }
})

