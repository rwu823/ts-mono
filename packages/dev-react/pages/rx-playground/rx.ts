import {
  ConnectableObservable,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  Subject,
  concat,
  defer,
  forkJoin,
  merge,
  of,
  timer,
} from 'rxjs'

import { map, mapTo, tap } from 'rxjs/operators'

const customOperator = <T>() =>
  ((source$) => source$.pipe()) as MonoTypeOperatorFunction<T>

function customOperator2<T>(): MonoTypeOperatorFunction<T> {
  return (s$) => s$.pipe()
}

const createRxOperator = <T>(
  pipeableOperators: (source$: Observable<T>) => void,
) => pipeableOperators

export const map1 = () => map((v: { a: number; b: string }) => `${v.a}+${v.b}`)

export const op2 = (state: string) => (source$: Observable<number>) =>
  source$.pipe(
    map((n) => ({ o: n, a: state })),
    map(() => {
      return { a: '111' }
    }),
  )
