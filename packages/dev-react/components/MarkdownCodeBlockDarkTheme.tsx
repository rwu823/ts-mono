import styled from '@emotion/styled'

const MarkdownCodeBlockDarkTheme = styled.div`
  /**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
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
    background: none;
    color: #abb2bf;
    font-family: 'Victor Mono', Menlo, monospace;
    font-size: 0.8rem;
    hyphens: none;
    line-height: 1.5;
    tab-size: 4;
    text-align: left;
    white-space: pre;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;
  }

  /* Code blocks */
  pre {
    margin: 0;
    overflow: auto;
    padding: 1em;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #779446;
  }

  .token.punctuation {
    color: #abb2bf;
  }

  .token.selector,
  .token.tag {
    color: #e06c75;
  }

  .token.property,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.attr-name,
  .token.deleted {
    color: #d19a66;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.builtin,
  .token.inserted {
    color: #98c379;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #56b6c2;
  }

  .token.atrule,
  .token.keyword {
    color: #c678dd;
  }

  .token.function {
    color: #61afef;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #c678dd;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  pre.line-numbers {
    position: relative;
    counter-reset: linenumber;
    padding-left: 3.8em;
  }

  pre.line-numbers > code {
    position: relative;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    top: 0;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    border-right: 0;
    font-size: 100%;
    letter-spacing: -1px;
    pointer-events: none;
    user-select: none;
  }

  .line-numbers-rows > span {
    counter-increment: linenumber;
    display: block;
    pointer-events: none;
  }

  .line-numbers-rows > span::before {
    color: #5c6370;
    content: counter(linenumber);
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
`
export default MarkdownCodeBlockDarkTheme
