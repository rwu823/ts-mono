import React from 'react'
import NextLink from 'next/link'

// import { MDXRenderers } from '@mdx-js/react'
import { H, Link, CodeBlock, Blockquote, Code } from './Markdown'
import { Meta as TypeCodeMeta } from './Markdown/CodeBlock'

type MDXRenderers = {
  inlineCode?: React.FC
  h1?: React.FC
  h2?: React.FC
  a?: React.FC<{ href: string }>
  code: React.FC<{ className: string; file?: string }>
  blockquote: React.FC
}

export const mdxRenders: MDXRenderers = {
  inlineCode: (props) => <Code {...props} />,
  h1: ({ children }) => <H level={1} text={children as string} />,
  h2: ({ children }) => <H level={2} text={children as string} />,

  a: ({ href, children, ...props }) => {
    let title = children as string
    const isExternal = title.endsWith('!')

    if (isExternal) {
      title = title.replace(/!$/, '')
      return (
        <Link {...props} href={href} external={isExternal}>
          {title}
        </Link>
      )
    }

    return (
      <NextLink href={href}>
        <Link {...props} href={href}>
          {title}
        </Link>
      </NextLink>
    )
  },

  code: ({ children, className = '' }) => {
    const language = className.split('-').slice(1).join('-') || ''

    const [type, meta] = language.split('|')

    let metaObj: TypeCodeMeta | undefined

    if (meta) {
      // eslint-disable-next-line no-new-func
      metaObj = new Function(`return { ${meta} }`)()
    }

    return <CodeBlock meta={metaObj} language={type} src={children as string} />
  },

  blockquote: (props) => <Blockquote {...props} />,
}
