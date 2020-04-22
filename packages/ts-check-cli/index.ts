import { exec, spawn } from 'child_process'
import ora from 'ora'

const execa = async (cmd: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err)

      resolve((stderr || stdout).trim())
    })
  })
;(async () => {
  const modifiedTSFiles = await execa(
    `git diff --name-only --cached '*.ts' '*.tsx'`,
  ).catch(console.error)

  const spinner = ora(`Start TS Checking...\n`)

  if (modifiedTSFiles) {
    spinner.start()
    spawn('npx', ['tsc', '--noEmit'], { stdio: 'inherit' }).on(
      'exit',
      (code) => {
        spinner.stop()
        process.exit(code || 0)
      },
    )
  } else {
    process.exit(0)
  }
})()
