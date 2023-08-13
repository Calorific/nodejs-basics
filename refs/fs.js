const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const base = path.join(__dirname, 'temp')

const getLog = () => `${process.argv[2] ?? ''}\n`

async function start() {
  try {
    if (!fsSync.existsSync(base))
      await fs.mkdir(base)

    await fs.appendFile(path.resolve(base, 'logs.txt'), getLog())
    const data = await fs.readFile(path.resolve(base, 'logs.txt'), { encoding: 'utf-8' })
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

start().then()