import {
    RECEIVE_ADD_NOTE,
    RECEIVE_DELETE_NOTE,
    RECIEVE_NOTES,
    RECEIVE_SELECT_NOTE,
    RECEIVE_UPDATE_NOTE,
    UNSELECT_NOTE,
    UPDATE_FILTER
} from './actions'

export const initialState = {
    notes: [],
    selectedNote: false,
    filter: false
}

export default function notes(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_ADD_NOTE:
            return Object.assign({}, state, {
                notes: [
                    ...state.notes,
                    action.payload.note
                ]
            })
        case RECEIVE_DELETE_NOTE:
            return Object.assign({}, state, {
                notes: state.notes.filter(note => note._id !== action.payload.deleted_id)
            })
        case RECIEVE_NOTES:
            return Object.assign({}, state, {
                notes: action.payload.notes
            })
        case RECEIVE_UPDATE_NOTE:
            const { newNote } = action.payload
            let noteIndex = state.notes.findIndex(note => note._id === newNote._id)
            return Object.assign({}, state, {
                notes: state.notes.map((note, i) => {
                    if(i == noteIndex) {
                        note = newNote
                    }
                    return note
                }),
                selectedNote: false
            })
        case RECEIVE_SELECT_NOTE:
            return Object.assign({}, state, {
                selectedNote: action.payload.note
            })
        case UNSELECT_NOTE:
            return Object.assign({}, state, {
                selectedNote: false
            })
        case UPDATE_FILTER:
            return Object.assign({}, state, {
                filter: action.payload.text
            })
        default:
            return state
    }
}