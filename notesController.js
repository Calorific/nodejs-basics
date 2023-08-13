const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function setNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await setNotes(notes)
  console.log(chalk.bgGreen('Note was added'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return JSON.parse(notes) || []
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue('List of notes:'))
  notes.forEach(note => console.log(chalk.blue(note.id + ' ' + note.title)))
}

async function updateNote(id, note) {
  const notes = await getNotes()
  await setNotes(notes.map(n => n.id === id ? { ...n, ...note } : n))
  console.log(chalk.yellow(`Note with id ${id} was updated\n`))
}

async function removeNote(id) {
  const notes = await getNotes()
  await setNotes(notes.filter(note => note.id !== id))
  console.log(chalk.red(`Note with id ${id} was deleted\n`))
}

module.exports = {
  addNote,
  getNotes,
  updateNote,
  removeNote
}