import { createGlobalStyle, css } from '@emotion/styled'

export const globalCSS = css`
  :root {
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: -apple-system, blinkmacsystemfont, 'Segoe UI',
      roboto, 'Helvetica Neue', arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    --font-family-monospace: sfmono-regular, menlo, monaco, consolas,
      'Liberation Mono', 'Courier New', monospace;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15;
    -webkit-tap-highlight-color: rgb(0 0 0 / 0%);
    text-size-adjust: 100%;
  }

  article,
  aside,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section {
    display: block;
  }

  body {
    background-color: #fff;
    color: #212529;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
    text-align: left;
  }

  [tabindex='-1']:focus {
    outline: 0 !important;
  }

  hr {
    height: 0;
    box-sizing: content-box;
    overflow: visible;
  }

  p {
    margin-bottom: 1rem;
    margin-top: 0;
  }

  abbr[title],
  abbr[data-original-title] {
    border-bottom: 0;
    cursor: help;
    text-decoration: underline dotted;
    text-decoration: underline;
    text-decoration: underline dotted;
    text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
  }

  address {
    font-style: normal;
    line-height: inherit;
    margin-bottom: 1rem;
  }

  menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ol,
  ul,
  dl {
    margin-bottom: 1rem;
    margin-top: 0;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-bottom: 0.5rem;
    margin-left: 0;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;

    p:last-child {
      margin: 0;
    }
  }

  b,
  strong {
    font-weight: bolder;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  a {
    background-color: transparent;
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  a:not([href]):not([tabindex]) {
    color: inherit;
    text-decoration: none;
  }

  a:not([href]):not([tabindex]):hover,
  a:not([href]):not([tabindex]):focus {
    color: inherit;
    text-decoration: none;
  }

  a:not([href]):not([tabindex]):focus {
    outline: 0;
  }

  pre,
  code,
  kbd,
  samp {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 1em;
  }

  pre {
    margin-bottom: 1rem;
    margin-top: 0;
    overflow: auto;
  }

  figure {
    margin: 0 0 1rem;
  }

  img {
    border-style: none;
    vertical-align: middle;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  table {
    border-collapse: collapse;
  }

  caption {
    caption-side: bottom;
    color: #6c757d;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    text-align: left;
  }

  th {
    text-align: inherit;
  }

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  button {
    border-radius: 0;
  }

  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  select {
    word-wrap: normal;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    appearance: button;
  }

  button:not(:disabled),
  [type='button']:not(:disabled),
  [type='reset']:not(:disabled),
  [type='submit']:not(:disabled) {
    cursor: pointer;
  }

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  input[type='radio'],
  input[type='checkbox'] {
    box-sizing: border-box;
    padding: 0;
  }

  input[type='date'],
  input[type='time'],
  input[type='datetime-local'],
  input[type='month'] {
    appearance: listbox;
  }

  textarea {
    overflow: auto;
    resize: vertical;
  }

  fieldset {
    border: 0;
    margin: 0;
    min-width: 0;
    padding: 0;
  }

  legend {
    width: 100%;
    color: inherit;
    display: block;
    font-size: 1.5rem;
    line-height: inherit;
    margin-bottom: 0.5rem;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    appearance: none;
    outline-offset: -2px;
  }

  [type='search']::-webkit-search-decoration {
    appearance: none;
  }

  ::-webkit-file-upload-button {
    appearance: button;
    font: inherit;
  }

  output {
    display: inline-block;
  }

  summary {
    cursor: pointer;
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    line-height: 1.2;
  }

  h1,
  h2 {
    margin: 1em 0;
  }

  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-size: 2em;
  }

  h3 {
    font-size: 1.75em;
  }

  h4 {
    font-size: 1.5em;
  }

  h5 {
    font-size: 1.25em;
  }

  h6 {
    font-size: 1em;
  }

  hr {
    border: 0;
    border-top: 1px solid rgb(0 0 0 / 10%);
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  small {
    font-size: 80%;
    font-weight: 400;
  }

  mark {
    background-color: #fcf8e3;
    padding: 0.2em;
  }

  @media print {
    *,
    *::before,
    *::after {
      box-shadow: none !important;
      text-shadow: none !important;
    }
  }
`

export const TheGlobalStyles = createGlobalStyle`
  ${globalCSS}
`

export default TheGlobalStyles
