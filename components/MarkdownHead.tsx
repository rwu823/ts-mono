import React from 'react'

import styled, { css } from 'styled-components'

const IconAnchor: React.FC = (props) => (
  <svg
    viewBox="0 0 1024 1024"
    fill="currentColor"
    overflow="hidden"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M230.827 896l30.293-170.667H90.453L105.387 640h170.666l45.227-256H150.613l14.934-85.333h170.666L366.507 128h85.333l-30.293 170.667h256L707.84 128h85.333L762.88 298.667h170.667L918.613 384H747.947L702.72 640h170.667l-14.934 85.333H687.787L657.493 896H572.16l30.293-170.667h-256L316.16 896h-85.333m175.786-512l-45.226 256h256l45.226-256h-256z" />
  </svg>
)

const IconAnchorStyled = styled(IconAnchor)`
  width: 15px;
  height: 15px;
  vertical-align: middle;
  visibility: hidden;
`

const A = styled.a`
  ${() => css`
    color: inherit;
    text-decoration: none;
    position: relative;
    color: inherit;
    text-decoration: none;

    ${IconAnchorStyled} {
      position: absolute;
      top: 50%;
      left: -20px;
      transform: translateY(-50%);
    }

    :hover {
      color: inherit;
      text-decoration: none;
      ${IconAnchorStyled} {
        visibility: visible;
      }
    }
  `}
`

type HeadLevel = 1 | 2 | 3 | 4 | 5 | 6
export const MarkdownHead: React.FC<{
  level: HeadLevel
  text?: string
}> = ({ level, text }) =>
  React.createElement(
    `h${level}`,
    {},
    React.createElement(
      A,
      {
        href: text ? `#${text.trim().toLowerCase().replace(/\s/g, '-')}` : '#',
      },
      [
        level < 3 && React.createElement(IconAnchorStyled, { key: 1 }),
        text,
      ].filter(Boolean),
    ),
  )
