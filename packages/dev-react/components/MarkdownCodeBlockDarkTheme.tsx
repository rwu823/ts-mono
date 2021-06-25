import styled from 'styled-components'

const MarkdownCodeBlockDarkTheme = styled.div`
  /**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

  /* @import url('https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap'); */

  i[data-line] {
    position: absolute;
    background: rgba(39, 73, 144, 0.3);
    width: 100%;
    left: 0;
    top: 0;
    height: 18px;
    pointer-events: none;
  }

  code,
  pre {
    color: #abb2bf;
    background: none;
    font-family: 'Victor Mono', 'Menlo', monospace;
    font-size: 0.8rem;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  /* Code blocks */
  pre {
    padding: 1em;
    margin: 0;
    overflow: auto;
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
    padding-left: 3.8em;
    counter-reset: linenumber;
  }

  pre.line-numbers > code {
    position: relative;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 0;
    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #5c6370;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
`
export default MarkdownCodeBlockDarkTheme
