//require
const path = require('path');

const router = require('express').Router();

//send notes to notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//send back to homepage of if issue rises
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

//exports
module.exports = router;