export enum CacheScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

type CacheControlArgs = {
  maxAge: number
  scope?: CacheScope
}

export const setCacheControl = (args: CacheControlArgs) => {
  let string = ''

  for (const [k, v] of Object.entries(args)) {
    string += `${k}: ${v},`
  }
  return `@cacheControl(${string})`
}

setCacheControl.minutes = 60
setCacheControl.hours = setCacheControl.minutes * 60
setCacheControl.days = setCacheControl.hours * 24
