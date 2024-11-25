import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App';

export async function handler(event) {
  const markup = ReactDOMServer.renderToString(<App />);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: markup,
  };
}