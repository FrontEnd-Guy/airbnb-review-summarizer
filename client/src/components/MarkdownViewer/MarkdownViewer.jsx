import React from 'react';
import { marked } from 'marked';

import './MarkdownViewer.scss';

function MarkdownViewer({ markdownText }) {
  const createMarkup = () => {
    return { __html: marked(markdownText) };
  };

  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

export default MarkdownViewer;
