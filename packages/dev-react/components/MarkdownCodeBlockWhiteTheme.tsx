import styled from '@emotion/styled'

const MarkdownCodeBlockWhiteTheme = styled.div`
  /**
 * VS theme by Andrew Lock (https://andrewlock.net)
 * Inspired by Visual Studio syntax coloring
 */

  /* @import url('https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap'); */

  i[data-line] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 18px;
    background: rgb(39 73 144 / 30%);
    pointer-events: none;
  }

  code,
  pre {
    color: #393a34;
    direction: ltr;
    font-family: 'Victor Mono', Menlo, monospace;
    font-size: 0.8rem;
    hyphens: none;
    line-height: 1.5em;
    tab-size: 4;
    text-align: left;
    white-space: pre;
    word-break: normal;
    word-spacing: normal;
  }

  /* Code blocks */
  pre {
    margin: 0;
    overflow: auto;
    padding: 1em;
  }

  /* Inline code */
  :not(pre) > code {
    background: #f8f8f8;
    border: 1px solid #ddd;
    padding: 0.2em;
    padding-bottom: 1px;
    padding-top: 1px;
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
    color: #00f;
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
    color: #f00;
  }

  .token.directive.tag .tag {
    background: #ff0;
    color: #393a34;
  }

  /* overrides color-values for the Line Numbers plugin
 * http://prismjs.com/plugins/line-numbers/
 */
  .line-numbers .line-numbers-rows {
    border-right-color: #a5a5a5;
  }

  .line-numbers-rows > span::before {
    color: #2b91af;
  }

  /* overrides color-values for the Line Highlight plugin
* http://prismjs.com/plugins/line-highlight/
*/
  .line-highlight {
    background: rgb(193 222 241 / 20%);
    background: linear-gradient(
      left,
      rgb(193 222 241 / 20%) 70%,
      rgb(221 222 241 / 0%)
    );
    background: linear-gradient(
      to right,
      rgb(193 222 241 / 20%) 70%,
      rgb(221 222 241 / 0%)
    );
  }
`
export default MarkdownCodeBlockWhiteTheme
