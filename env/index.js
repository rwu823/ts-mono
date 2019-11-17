const pkg = require('./package.json')

const {
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_SHA1,
} = process.env

const IMAGE = `gcr.io/GCLOUD_PROJECT/www:${CIRCLE_SHA1}`

module.exports = {
  NPM_TOKEN: '3e400aba-8cf4-43b9-b43d-7f4af70c3589',
  VSCE_TOKEN: 'fi75tznigfogann2ogm622ncxmxh3xunmovj2hexfesofxsihiwq',
  IMAGE,
  VER: pkg.version,
  get GIT_TAG() {
    return `v${this.VER}`
  },
}
