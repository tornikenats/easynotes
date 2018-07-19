export default {
    getNotes: () => {
        return fetch('/api/v1/notes', {
            credentials: 'same-origin'
        })
            .then(resp => resp.json())
    },
    deleteNote: id => {
        return fetch('/api/v1/notes/' + id, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
    },
    addNote: entry => {
        return fetch('/api/v1/notes', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry)
        })
            .then(resp => resp.json())
    },
    updateNote: (id, entry) => {
        return fetch('/api/v1/notes/' + id, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry)
        })
            .then(resp => resp.json())
    }
}