const globalThis = (1, eval)('this') // eslint-disable-line no-eval

const ofType = (o: unknown, type: string) =>
  `[object ${type}]` === Object.prototype.toString.call(o)

const { NODE_ENV } = process.env

export const is = {
  ofType,
  string: (o: unknown): o is string => ofType(o, 'String'),
  function: (o: unknown): o is Function => ofType(o, 'Function'),
  object: (o: unknown): o is object => ofType(o, 'Object'),
  array: (o: unknown): o is any[] => ofType(o, 'Array'),
  number: (o: unknown): o is number => ofType(o, 'Number'),
  null: (o: unknown): o is null => ofType(o, 'Null'),
  undefined: (o: unknown): o is undefined => ofType(o, 'Undefined'),
  date: (o: unknown): o is Date => ofType(o, 'Date'),
  document: (o: unknown): o is HTMLDocument => ofType(o, 'HTMLDocument'),
  process: (o: unknown): o is NodeJS.Process => ofType(o, 'process'),

  get env() {
    return {
      browser: this.document(globalThis.document),
      node: this.process(globalThis.process),
      dev: !NODE_ENV || NODE_ENV === 'development',
      prod: NODE_ENV === 'production',
      test: NODE_ENV === 'test',

      eq: (env: string) => NODE_ENV === env,
    }
  },
}

export default is
