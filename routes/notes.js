const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
// http://localhost:3001/api/tips/
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// http://localhost:3001/api/tips/1
// GET Route for a specific tip
notes.get('/:id', (req, res) => {
  const notesId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((notes) => notes.id === notesId);
      return result.length > 0
        ? res.json(result)
        : res.json('No tip with that ID');
    });
});
// http://localhost:3001/api/tips/1
// DELETE Route for a specific tip
notes.delete('/:id', (req, res) => {
  const notesId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((notes) => notes.id !== notesId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${notesId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI tip
// https://localhost:3001/api/tips/
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    const parsedData = readAndAppend(newNote, './db/db.json');
    res.json(parsedData);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
