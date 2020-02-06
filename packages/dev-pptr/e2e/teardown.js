module.exports = async () => {
  await global.BROWSER_INSTANCE.close()
}
