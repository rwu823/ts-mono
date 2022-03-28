const getCollisionIdAttrs = (children) => {
  const attrs = []

  for (const c of children) {
    if (c.children.length > 0) {
      attrs.push(...getCollisionIdAttrs(c.children))
    }

    for (const a of c.openingElement.attributes) {
      if (
        (a.name.name === 'id' && a.name.type === 'JSXIdentifier') ||
        (a.value.value && a.value.value.startsWith('url('))
      ) {
        attrs.push(a)
      }
    }
  }

  return attrs
}

const template = ({ jsx, ...vars }, { tpl }) => {
  const componentName = `${vars.componentName.replace(/^Svg/, '')}Icon`

  jsx.openingElement.name.name = 'Icon'
  jsx.closingElement.name.name = 'Icon'
  jsx.openingElement.attributes.push(
    {
      type: 'JSXSpreadAttribute',
      argument: { type: 'Identifier', name: 'props' },
    },
    {
      type: 'JSXAttribute',
      name: {
        type: 'JSXIdentifier',
        name: 'ref',
      },
      value: {
        type: 'JSXExpressionContainer',
        expression: {
          type: 'Identifier',
          name: 'ref',
        },
      },
    },
  )

  const collisionIdAttrs = getCollisionIdAttrs(jsx.children)

  for (const attr of collisionIdAttrs) {
    const isUseId = attr.value.value.startsWith('url(')

    Object.assign(attr.value, {
      type: 'JSXExpressionContainer',
      expression: {
        type: 'TemplateLiteral',
        quasis: [
          {
            type: 'TemplateElement',
            value: {
              raw: attr.value.value.slice(
                0,
                isUseId ? -1 : Number.POSITIVE_INFINITY,
              ),
            },
          },

          {
            type: 'TemplateElement',
            value: {
              raw: attr.value.value.slice(
                isUseId ? -1 : Number.POSITIVE_INFINITY,
              ),
            },
          },
        ],
        expressions: [{ type: 'Identifier', name: 'id' }],
      },
    })
  }

  const ast = tpl/* tsx */ `

import React from 'react'
import type { IconProps } from '@ts-mono/dev-react/components/Icon'
import { Icon } from '@ts-mono/dev-react/components/Icon'

export const ${componentName} = React.forwardRef((props: IconProps, ref: React.Ref<SVGSVGElement>) => {
  ${collisionIdAttrs.length > 0 ? 'const id = React.useId()' : ''}

  return ${jsx}
})

${componentName}.displayName = '${componentName}'
`

  return ast
}

/**
 * reference: https://react-svgr.com/docs/options
 */
module.exports = {
  // icon: process.env.ICON ? 20 : false,
  typescript: true,
  svgProps: {},
  memo: true,
  ref: true,
  prettier: true,
  ext: 'icon.tsx',
  template,
  replaceAttrValues: {},
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },

      'removeXMLNS',

      {
        name: 'sortAttrs',
        params: {
          xmlnsOrder: 'alphabetical',
        },
      },

      process.env.ICON && {
        name: 'convertColors',
        params: {
          currentColor: true,
        },
      },

      {
        name: 'removeAttrs',
        params: {
          attrs: [
            'height',
            process.env.ICON &&
              '(fill.opacity|fill.rule|clip.*|stroke.opacity)',
          ].filter(Boolean),
        },
      },
    ].filter(Boolean),
  },
}
