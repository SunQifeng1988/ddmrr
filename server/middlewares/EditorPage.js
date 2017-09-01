/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import assets from '../../build/assets.json';
import config from '../../config';

class EditorPage extends Component {
  static propTypes = {
    app: PropTypes.string.isRequired,
  }
  render = () => {
    return (
      <html className="no-js" lang="zh-CN">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

          <title>reveal-editor.js</title>
          {
            Object.keys(config.stylesheets).map(key => <link id={ `css_${key}` } rel="stylesheet" key={ key } href={ config.stylesheets[key] }/>)
          }
          <link id={ 'css_ddmrr' } rel="stylesheet" href={ assets.ddmrr.css }/>
        </head>
        <body>
          <div className="parent" style={ {
            left: '100px',
            top: '100px',
            width: '400px',
            height: '200px',
            border: '20px solid black' } }
          >
            <div className="child">
              <h1>Child Inside</h1>
            </div>
          </div>
          {/* <div className="parent">
            <div className="child">
              <image src="/static/test.jpg"/>
            </div>
          </div> */}
          <script id={ 'js_ddmrr' } src={ assets.ddmrr.js }/>
        </body>
      </html>
    );
  }
}

const renderer = (req, res) => {
  const app = assets[req.params.app] ? req.params.app : 'app';
  const content = `<!doctype html>${ReactDOMServer.renderToStaticMarkup(<EditorPage app={ app }/>)}`;
  res.type('.html');
  res.send(content);
};

export default renderer;
