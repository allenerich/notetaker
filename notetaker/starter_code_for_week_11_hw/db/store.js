const util = require('util')
const fs = require('fs')

const uuidv1 = require('uuid/v1')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
  read() {
    return readFileAsync("./db.json", "utf8")
  }

  write(note) {
    return writeFileAsync("./db.json", JSON.stringify(note))
  }

  getNotes() {
    this.read().then(notes => {
      // parse the JSON string and turn into an object
      // add them to a list
      // return that list (array)
      app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
      });  
       app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, './public/notes.html'));
    });
    app.get('/api/notes', (req, res) => {
      res.json(noteJSON);
    });
  }

  addNote(note) {
    // use the note argument
    // create a new note object with your required fields (text, title, id)
    // write that object to the json file
    app.post('/api/notes', (req, res) => {
      // get Id of last note if it exists or 0
      const lastId = noteJSON.length ? Math.max(...(noteJSON.map(note => note.id))) : 0;
      const id = lastId + 1;
      noteJSON.push( { id, ...req.body} );
      res.json(noteJSON.slice(-1));
      });

  }

  removeNote(id) {
    // get all notes
    // remove the note with the given id
    // and return a list of notes that does NOT have that id (in essence the filtered list)
    app.delete('/api/notes/:id', (req, res) => {
      let note = noteJSON.find( ({ id }) => id === JSON.parse(req.params.id));
      // removes object at index of note id
      noteJSON.splice( noteJSON.indexOf(note), 1);
      res.end("Note deleted");
      });
  }

}

module.exports = new Store()