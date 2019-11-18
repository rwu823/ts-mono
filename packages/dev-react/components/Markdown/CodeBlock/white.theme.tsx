import styled from 'styled-components'

const CodeBlockTheme = styled.div`
  /**
 * VS theme by Andrew Lock (https://andrewlock.net)
 * Inspired by Visual Studio syntax coloring
 */

  /* @import url('https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap'); */

  i[data-line] {
    position: absolute;
    background: rgba(39, 73, 144, 0.3);
    width: 100%;
    left: 0;
    top: 0;
    height: 21px;
    pointer-events: none;
  }

  code,
  pre {
    color: #393a34;
    font-family: 'Menlo', monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    font-size: 0.9rem;
    line-height: 1.5em;
    tab-size: 4;
    hyphens: none;
  }

  /* Code blocks */
  pre {
    padding: 1em;
    margin: 0;
    overflow: auto;
  }

  /* Inline code */
  :not(pre) > code {
    padding: 0.2em;
    padding-top: 1px;
    padding-bottom: 1px;
    background: #f8f8f8;
    border: 1px solid #ddd;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #008000;
    font-style: italic;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.string {
    color: #a31515;
  }

  .token.punctuation,
  .token.operator {
    color: #393a34; /* no highlight */
  }

  .token.url,
  .token.symbol,
  .token.number,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.inserted {
    color: #36acaa;
  }

  .token.atrule,
  .token.keyword,
  .token.attr-value,
  .language-autohotkey .token.selector,
  .language-json .token.boolean,
  .language-json .token.number,
  code[class*='language-css'] {
    color: #0000ff;
  }

  .token.function {
    color: #393a34;
  }
  .token.deleted,
  .language-autohotkey .token.tag {
    color: #9a050f;
  }

  .token.selector,
  .language-autohotkey .token.keyword {
    color: #00009f;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.class-name,
  .language-json .token.property {
    color: #2b91af;
  }

  .token.tag,
  .token.selector {
    color: #800000;
  }

  .token.attr-name,
  .token.property,
  .token.regex,
  .token.entity {
    color: #ff0000;
  }

  .token.directive.tag .tag {
    background: #ffff00;
    color: #393a34;
  }

  /* overrides color-values for the Line Numbers plugin
 * http://prismjs.com/plugins/line-numbers/
 */
  .line-numbers .line-numbers-rows {
    border-right-color: #a5a5a5;
  }

  .line-numbers-rows > span:before {
    color: #2b91af;
  }

  /* overrides color-values for the Line Highlight plugin
* http://prismjs.com/plugins/line-highlight/
*/
  .line-highlight {
    background: rgba(193, 222, 241, 0.2);
    background: -webkit-linear-gradient(
      left,
      rgba(193, 222, 241, 0.2) 70%,
      rgba(221, 222, 241, 0)
    );
    background: linear-gradient(
      to right,
      rgba(193, 222, 241, 0.2) 70%,
      rgba(221, 222, 241, 0)
    );
  }
`
export default CodeBlockTheme
