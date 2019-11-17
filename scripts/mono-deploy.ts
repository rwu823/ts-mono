import sh from 'sh-exec'
import pkgJSON from '../package.json'

const deploymentPackagesSet = new Set([
  'ts-check-cli',
  'ts-base',
  'dev-react',
  'dev-pptr',
  'gatsby',
  'storybook',
])

const getDeploymentPackages = async () => {
  const stdout = await sh`git diff --name-only HEAD~1`

  const modifiedPaths = (stdout.match(/^packages\/([^/]+)/gm) || []).map(
    filePath => filePath.split('/')[1],
  )

  const uniqPackages = [...new Set(modifiedPaths)].filter((pkg: string) =>
    deploymentPackagesSet.has(pkg),
  )

  return uniqPackages
}
;(async () => {
  const modifiedPackages = await getDeploymentPackages().catch(console.error)

  if (Array.isArray(modifiedPackages)) {
    if (modifiedPackages.length) {
      sh`
        git config --global user.name CircleCI
        git config --global user.email mono_deploy@circleci.com
      `

      sh.quiet`
        git push ${pkgJSON.repository} --force ${modifiedPackages
        .map(pkg => `HEAD:prod/${pkg}`)
        .join(' ')}
      `
    } else {
      console.log(`No branches be deployed.`)
    }
  }
})()
