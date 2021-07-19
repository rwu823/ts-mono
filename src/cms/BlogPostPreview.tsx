import React from 'react'

import BlogPostTemplate from '../components/BlogPostTemplate'

type GetIn = {
  (params: ['data', 'tags']): string[]
  (params: ['data', 'title']): string
}

type NetlifyCMSWidget = {
  widgetFor: (area: 'body') => string
  entry: {
    getIn: GetIn
  }
}

const BlogPostPreview: React.FC<NetlifyCMSWidget> = ({ widgetFor, entry }) => (
  <BlogPostTemplate
    body={widgetFor('body')}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

export default BlogPostPreview
