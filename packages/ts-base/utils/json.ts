export const parseJSON = <T extends { [name: string]: any }>(
  stringLikeJSON = '',
): Partial<{ [name in keyof T]: T[name] }> =>
  // eslint-disable-next-line no-new-func
  new Function(`return ${stringLikeJSON}`)()

/**
 *
 * @param jsonObj
 * @param indent - default is  2
 */
export const stringify = (jsonObj: Object, indent = 2) =>
  JSON.stringify(jsonObj, null, indent)
