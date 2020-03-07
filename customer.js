const fs = require("fs");

// ------------------Begin of Reusable functions ---------------------

var fetchNotes = () => {
  try {
    //if file won't exist
    var notesString = fs.readFileSync("customer-data.json");
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = notes => {
  fs.writeFileSync("customer-data.json", JSON.stringify(notes));
};

// ------------------End of Reusable functions ---------------------

//  to add a Customer

var addCustomer = (id, name, email) => {
  console.log("addCustomer args in notes.......", id, name, email);
  var notes = fetchNotes();
  var note = { id, name, email };

  var duplicateNotes = notes.filter(note => {
    // to check if note already exists
    return note.id === id;
  });

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

//  to update a Customer

var updateCustomer = (id, name, email) => {
  console.log("updateCustomer in notes.......", id, name, email);
  var notes = fetchNotes();
  var note = { id, name, email };

  var findCustomer = notes.filter(note => {
    // to check if note already exists
    if ( note.id === id ) {
      note.name = name;
      note.email = email;
    }
  });

  if (findCustomer.length === 0) {
    //notes.push(note);
    saveNotes(notes);
    return note;
  }
};

//to list all the notes

var getAll = () => {
  return fetchNotes();
};

// to read a note

var getNote = id => {
  var notes = fetchNotes();

  var getNotes = notes.filter(note => {
    // to check if note exists and return note
    return note.id === id;
  });

  return getNotes[0];
};

// to delete a note

var remove = id => {
  var notes = fetchNotes(); // reusable func

  var filteredNotes = notes.filter(note => {
    // will return all other notes other than "note to be removed"
    return note.id !== id;
  });

  saveNotes(filteredNotes); //save new notes array

  return notes.length !== filteredNotes.length;
};

// function just to print out note to screen

var logNote = note => {
  console.log("--");
  console.log(`ID: ${note.id}`);
  console.log(`Name: ${note.name}`);
  console.log(`Email: ${note.email}`);
};

// add new function names here to be accessible from other modules

module.exports = {
  addCustomer,
  updateCustomer,
  getAll,
  remove,
  getNote,
  logNote
};
