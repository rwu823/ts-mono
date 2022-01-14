import { readdirSync } from 'fs'
import sh from 'sh-exec'

const { GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env

const deploymentPackagesSet = new Set(
  readdirSync('packages').filter((dir) => dir !== 'share'),
)

const getDeploymentPackages = async () => {
  const stdout = await sh`git diff --name-only HEAD~1`

  const modifiedPaths = (stdout.match(/^packages\/([^/]+)/gm) || []).map(
    (filePath) => filePath.split('/')[1],
  )

  const uniqPackages = [...new Set(modifiedPaths)].filter((pkg: string) =>
    deploymentPackagesSet.has(pkg),
  )

  return uniqPackages
}
;(async () => {
  const modifiedPackages = await getDeploymentPackages().catch(console.error)

  if (Array.isArray(modifiedPackages)) {
    if (modifiedPackages.length > 0) {
      sh`
        git config --global user.name GitHub_Actions
        git config --global user.email mono_deploy@github.com
      `

      sh.quiet`
        git push https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git --force ${modifiedPackages
        .map((pkg) => `HEAD:prod/${pkg}`)
        .join(' ')}
      `
    } else {
      console.log(`No branches be deployed.`)
    }
  }
})()
