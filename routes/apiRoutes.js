//handle new requests
const router = require('express').Router();

//require store
const store = require('../db/data');

//request existing notes
router.get('/notes', (req, res) => {
    store.getNotes().then(notes=> {
        res.json(notes)
    }).catch(err => {
        res.status(400).json(err)
    })
});

//note posting route
router.get('/notes', (req, res) => {
    store.addNote(req.body).then(note => {
        res.json(note)
    }).catch(err => {
        res.status(400).json(err)
    })
});

//note delete route
router.delete('/notes/:id', (req, res) => {
    store.removeNote(req.params.id).then(() => res.json({ ok: true})).catch(err => res.status(400).json(err))
});

//export
module.exports = router;
