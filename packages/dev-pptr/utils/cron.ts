export const cron = async (
  func: () => Promise<() => Promise<void>>,
  timeout: number = 0,
) => {
  const job = await func()

  const pageJob = async () => {
    await job().catch(console.error)
    setTimeout(pageJob, timeout)
  }

  await pageJob()
}

export default cron
