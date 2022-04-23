//require
const fs = require('fs');
const path = require('path');

module.exports = app => {
    //notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        //API routes
        app.get('/api/notes', function(req, res) {
            //returns all saves notes as json
            res.json(notes);
        });

        app.post('/api/notes', function(req, res) {
            //returns new note by adding it to db.json array
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log('Added new note')
        });

        //retrieves a specific note
        app.get('/api/notes/:id', function(req, res) {
            //displays json for notes array
            res.json(notes[req.params.id]);
        });

        //deletes a specific note
        app.delete('/api/notes/:id', function (req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log('Deleted note');
        });

        //html routes

        //display notes.html when /notes is accessed
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });

        //Display index.html file when all routes are accessed
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });

        //updates json file when a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
};