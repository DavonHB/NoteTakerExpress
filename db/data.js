//require
const util = require('util');
const fs = require('fs');
//npm package
const uuid = require('uuid');

//callback to return objects
const readFileAsync = util.promisify(fs.readFile);
const writFileAsync = util.promisify(fs.writeFile);

class Data {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
        return writFileAsync("db/db.json", JSON.stringify(note))
    }

    addNote(note) {
        //pull from Array
        const { title, text } = note

        if (!title || !text) {
            throw new Error('Title and text invalid')
        }

        const newNote = { title, text, id: uuid() }

        return this.getNotes().then(notes => [...notes, newNote]).then(updatedNotes => this.write(updatedNotes)).then(() => this.newNote)
    }

    getNotes() {
        return this.read().then(notes => {
            return JSON.parse(notes) || [];
        })
    }

    removeNote(id) {
        return this.getNotes().then(notes => notes.filter(note => note.id !== id)).then(keptNotes => this.write(keptNotes))
    }
}

module.exports = new Data();