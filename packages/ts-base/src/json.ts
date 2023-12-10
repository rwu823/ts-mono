export const parseJSON = <T extends Record<string, unknown>>(
  stringLikeJSON = '',
): T =>
  // eslint-disable-next-line no-new-func
  new Function(`return ${stringLikeJSON}`)()

/**
 *
 * @param jsonObj
 * @param indent - default is  2
 */
export const stringify = (jsonObj: object, indent = 2) =>
  JSON.stringify(jsonObj, null, indent)
