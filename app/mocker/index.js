const uuid4 = require('uuid/v4')

// const { login } = require('./user');
let notes = [
    { "_id": "bba34537-ffca-4b47-ac4d-c684c5ba84d0", "text": "At the end of 1999, these books were named among the best twelve physical-science monographs of the century by American Scientist, along with: Dirac on quantum mechanics, Einstein on relativity, Mandelbrot on fractals, Pauling on the chemical bond, Russell and Whitehead on foundations of mathematics, von Neumann and Morgenstern on game theory, Wiener on cybernetics, Woodward and Hoffmann on orbital symmetry, Feynman on quantum electrodynamics, Smith on the search for structure, and Einstein's collected papers.", "tags": ["who", "is", "red"], "ts": 1499054425.7459 },
    { "text": "https://www.nngroup.com/articles/most-hated-advertising-techniques/", "tags": ["read"], "_id": "cb6f7840-cfd4-4393-b7d3-bf5b6a81bae8", "ts": 1497155756.9703727 },
    { "text": "http://pencil.evolus.vn/", "tags": [], "_id": "363aee7c-968a-41ef-afdd-8ad0458132c3", "ts": 1496933680.6331744 },
    { "text": "https://www.reddit.com/r/cscareerquestions/comments/6fysn6/android_developers_andor_recruiters_what_should/", "tags": [], "_id": "a6e7cea4-130c-494a-83af-39edd0e53031", "ts": 1496945347.9518368 },
    { "text": " https://libcom.org/files/Bertrand%20Russell%20-%20In%20Praise%20of%20Idleness.pdf", "tags": ["read"], "_id": "74e0ccbb-355b-4c56-91e6-bed59aa24d10", "ts": 1497033200.0642157 },
    { "text": " redis", "tags": ["study"], "_id": "97af10c5-98bd-4d36-8329-7dd377bc1ce6", "ts": 1497052554.2790906 },
    { "text": " kafka", "tags": ["study"], "_id": "75082341-761f-49fa-bca9-96ab8cf0548b", "ts": 1497052557.9521453 },
    { "text": " https://github.com/gravitational/workshop/blob/master/k8sprod.md", "tags": ["kubernetes", " devops"], "_id": "e9868dfd-cb13-430c-b5ed-978816984b19", "ts": 1497104578.5660923 },
    { "_id": "57606e63-1926-4a51-a17b-869e0a46560a", "text": "https://eng.uber.com/neural-networks/", "tags": ["ML"], "ts": 1497278350.3720508 },
    { "_id": "dce78a64-aea9-4457-b05a-27fb89085568", "text": "Boubou - La Bohème (https://soundcloud.com/bouboumusic)", "tags": ["songs"], "ts": 1497279196.308665 },
]
let authenticated = false

const proxy = {
    // NOTES
    'GET /api/v1/notes': (req, res) => {
        console.log('---->', req.params)
        return res.json(notes);
    },
    'GET /api/v1/notes/:_id': (req, res) => {
        const { _id } = req.params;
        console.log('---->', req.params)
        return res.json(notes.filter(note => note._id === _id))
    },
    'PUT /api/v1/notes/:_id': (req, res) => {
        const { _id } = req.params;
        console.log('---->', req.params)
        let index = notes.findIndex(note => note._id == _id)
        notes[index] = {
            ...notes[index],
            tags: req.body.tags,
            text: req.body.text
        }
        return res.json(notes[index])
    },
    'POST /api/v1/notes': (req, res) => {
        const new_note = {
            ...req.body,
            _id: uuid4(),
            ts: new Date().getTime()
        }
        notes.push(new_note)
        return res.json(new_note)
    },
    'DELETE /api/v1/notes/:_id': (req, res) => {
        const { _id } = req.params;
        if (notes.some(note => note._id === _id)) {
            notes = notes.filter(note => note._id !== _id)
        }
        return res.json({ deleted_id: _id });
    },
    // AUTH
    'POST /api/v1/auth/login': (req, res) => {
        const { secret, username } = req.body;
        if (username === 'test' && secret === '1234') {
            authenticated = true
            return res.json({
                authenticated,
                user: {
                    id: 1,
                    username: 'kenny',
                    sex: 6
                }
            });
        }
        return res.json({
            status: 'error',
            authenticated,
            code: 403
        });
    },
    'GET /api/v1/auth/status': (req, res) => {
        return res.json({
            authenticated,
        });
    },
    'POST /api/v1/auth/logout': (req, res) => {
        authenticated = false
        return res.json({});
    }
}
module.exports = proxy;