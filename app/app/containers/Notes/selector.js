import { createSelector } from 'reselect'
import { initialState } from './reducer'


const equalityTest = currentEntry => note => {
    if (!currentEntry) return true
    let noteContent = note.tags.join(' ').toLowerCase()
    return contains(currentEntry, noteContent)
}

const contains = (entry, target) => {
    let entryTokens = entry.toLowerCase().split(' ')
    return entryTokens.every(token => target.indexOf(token) != -1)
}

const selectNote = state => state.get('note', initialState)

const makeSelectNotes = () =>
  createSelector(selectNote, noteState => noteState.get('notes').filter(note => equalityTest(noteState.get('filter'))(note)))

const makeSelectSelectedNote = () =>
    createSelector(selectNote, noteState => noteState.get('selectedNote'))

export { selectNote, makeSelectNotes, makeSelectSelectedNote }
