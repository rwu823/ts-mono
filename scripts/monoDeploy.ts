import { readdirSync } from 'fs'
import sh from 'sh-exec'

const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_JOB } = process.env

const deploymentPackagesSet = new Set(
  readdirSync('packages').filter((dir) => dir !== 'share'),
)

const getDeploymentPackages = async () => {
  const stdout = await sh.quiet`git diff --name-only HEAD~1`

  const modifiedPaths = (stdout.match(/^packages\/([^/]+)/gm) || []).map(
    (filePath) => filePath.split('/')[1],
  )

  const uniqPackages = [...new Set(modifiedPaths)].filter((pkg: string) =>
    deploymentPackagesSet.has(pkg),
  )

  return uniqPackages
}

const repo = `https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git`
const isBuildedPackagesSet = new Set([
  'ts-base',
  'eslint-config',
  'stylelint-config',
])

;(async () => {
  const modifiedPackages = await getDeploymentPackages().catch(console.error)

  if (Array.isArray(modifiedPackages)) {
    await sh`
      git config --global user.email "actions@github.com"
      git config --global user.name "${GITHUB_JOB}"
    `
    for (const pkg of modifiedPackages) {
      console.log(`Start to deploy ${pkg}`)

      const isBuild = isBuildedPackagesSet.has(pkg)

      const buildCommand = isBuild
        ? sh`yarn workspace @ts-mono/${pkg} build`
        : Promise.resolve()

      buildCommand.then(
        () => sh`
        cd packages/${pkg}${isBuild ? `/out` : ``}
        git init
        git add .
        git commit -nm 'update'
        git push ${repo} HEAD:pkg/${pkg} --force
    `,
      )
    }
  }
})()
