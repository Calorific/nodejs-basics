const yargs = require('yargs')
const { addNote, printNotes, removeNote } = require('./notesController')
const pkg = require('./package.json')

yargs.version(pkg.version)

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  handler: async ({ title }) => {
    await addNote(title)
  }
})

yargs.command({
  command: 'list',
  describe: 'Print all notes',
  handler: printNotes
})

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  handler: async ({ id }) => {
    await removeNote(id.toString())
  }
})

yargs.parse()