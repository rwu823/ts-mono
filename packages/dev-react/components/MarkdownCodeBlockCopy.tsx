import React from 'react'

import styled, { css } from 'styled-components'

export const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    height="1em"
    style={{
      width: 20,
      height: 20,
      verticalAlign: 'middle',
    }}
    viewBox="0 0 1024 1024"
    width="1em"
    {...props}
  >
    <path
      d="M571.52 909.44H280.96c-61.44 0-111.36-49.92-111.36-111.36V387.2c0-61.44 49.92-111.36 111.36-111.36h290.56c61.44 0 111.36 49.92 111.36 111.36v410.88c0 61.44-49.92 111.36-111.36 111.36zm-290.56-569.6c-26.24 0-47.36 21.12-47.36 47.36v410.88c0 26.24 21.12 47.36 47.36 47.36h290.56c26.24 0 47.36-21.12 47.36-47.36V387.2c0-26.24-21.12-47.36-47.36-47.36H280.96z"
      fill="inherit"
    />
    <path
      d="M775.68 742.4c-17.92 0-32-14.08-32-32V333.44c0-66.56-53.76-120.32-120.32-120.32h-256c-17.92 0-32-14.08-32-32s14.08-32 32-32h256c101.76 0 184.32 82.56 184.32 184.32V710.4c0 17.28-14.08 32-32 32z"
      fill="inherit"
    />
  </svg>
)
