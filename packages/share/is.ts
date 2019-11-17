const globalThis = (1, eval)('this') // eslint-disable-line no-eval

const ofType = (o: any, type: string) =>
  `[object ${type}]` === Object.prototype.toString.call(o)

const { NODE_ENV } = process.env

export const is = {
  ofType,
  string: (o: any): o is string => ofType(o, 'String'),
  function: (o: any): o is Function => ofType(o, 'Function'),
  object: (o: any): o is object => ofType(o, 'Object'),
  array: (o: any): o is any[] => ofType(o, 'Array'),
  number: (o: any): o is number => ofType(o, 'Number'),
  null: (o: any): o is null => ofType(o, 'Null'),
  undefined: (o: any): o is undefined => ofType(o, 'Undefined'),
  date: (o: any): o is Date => ofType(o, 'Date'),
  document: (o: any): o is HTMLDocument => ofType(o, 'HTMLDocument'),
  process: (o: any): o is NodeJS.Process => ofType(o, 'process'),

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
