/// <reference types="react" />

type Act = {
  (callback: () => void): void
  (callback: () => Promise<void>): Promise<void>
}

namespace NodeJS {
  interface Global {
    app: HTMLDivElement
    act: Act
    render: (el: JSX.Element) => void

    firstChild: HTMLElement
    unMount: () => void
  }
}

declare const app: NodeJS.Global['app']
declare const render: NodeJS.Global['render']
declare const act: Act
declare const firstChild: NodeJS.Global['firstChild']
declare const unMount: () => void
