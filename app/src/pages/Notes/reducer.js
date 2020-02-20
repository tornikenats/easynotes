import { fromJS, List } from 'immutable'
import {
    RECEIVE_ADD_NOTE,
    RECEIVE_DELETE_NOTE,
    RECIEVE_NOTES,
    RECEIVE_SELECT_NOTE,
    RECEIVE_UPDATE_NOTE,
    UNSELECT_NOTE,
    UPDATE_FILTER
} from './actions'

export const initialState = fromJS({
    notes: [],
    selectedNote: false,
    filter: false
})

export default function notes(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_ADD_NOTE:
            return state.update('notes', notes => notes.push(action.payload.note))
        case RECEIVE_DELETE_NOTE:
            return state.update('notes', notes => notes.delete(state.get('notes').findIndex(note => note._id === action.payload.deleted_id)))
            // state.notes = state.notes.filter(note => note._id !== action.payload.note._id)
        case RECIEVE_NOTES:
            return state.set('notes', List(action.payload.notes))
        case RECEIVE_UPDATE_NOTE:
            const { newNote } = action.payload
            let noteIndex = state.get('notes').findIndex(note => note._id === newNote._id)
            return state.setIn(['notes', noteIndex], newNote).set('selectedNote', false)
        case RECEIVE_SELECT_NOTE:
            return state.set('selectedNote', action.payload.note)
        case UNSELECT_NOTE:
            return state.set('selectedNote', false)
        case UPDATE_FILTER:
            return state.set('filter', action.payload.text)
        default:
            return state
    }
}