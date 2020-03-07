
const fs =  require('fs');
const yargs = require('yargs');

const notes = require('./customer.js');

// ------------ Begin - command configuration -----------------

const id = {
  describe: 'Customer ID',
  demand : true,
  alias : 'i'
}

const name = {
  describe: 'Customer Name',
  demand : true,
  alias : 'n'
}

const email = {
  describe: 'Customer Email',
  demand : true,
  alias : 'e'
}

const argv =  yargs

    .command('addCustomer','Add a Customer',{
        id: id,
        name: name,
        email: email
    })
    .command('updateCustomer','Edit a Customer',{
      id: id,
      name: name,
      email: email
  })
    .command('list','List all notes')
    .command('read','Read a note',{
      id: id
    })
    .command('remove','Remove a Note',{
      id: id
    })
    
    
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];

 if (command === 'addCustomer') {
    var note = notes.addCustomer(argv.id ,argv.name, argv.email);
    if (note){
      notes.logNote(note);                                //add a new note
    } else{
      console.log("Customer already exists");
    }
}

else if (command === 'updateCustomer') {
  console.log('Args data........',argv.id, argv.name, argv.email);
  var note = notes.updateCustomer(argv.id, argv.name, argv.email);
  if (note){
    notes.logNote(note);                                //add a new note
  } else{
    console.log("Customer already exists");
  }
}

else if (command === 'list') {
  var AllNotes = notes.getAll();
  console.log(`Printing ${AllNotes.length} note(s).`);
  AllNotes.forEach((note)=>{                                //list all note(s)
    notes.logNote(note);
  });
}

else if (command === 'read') {
   var note = notes.getNote(argv.id);
   if(note){
    notes.logNote(note);                                //read a note 
          }
   else{
    console.log("Note not found");
   }
}
else if (command === 'remove') {
    var noteRemoved = notes.remove(argv.id);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}

else{
  console.log('command note recognized'); 
}
