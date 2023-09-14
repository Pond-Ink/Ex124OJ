const path = require('path');
const fs = require('fs');

const metadata = 
`// ==UserScript==
// @name         Ex124OJ
// @namespace    http://tampermonkey.net/
// @version      ${require('./package.json').version}
// @description  Extend 124OJ!
// @author       Sukwants
// @license      MIT
// @match        http://124.221.194.184/*
// @icon         https://ex124oj.pond.ink/images/icon.png
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_xmlhttpRequest
// @connect      ex124oj.pond.ink
// @run-at       document-start
// ==/UserScript==
`;

fs.writeFileSync(path.resolve(__dirname, 'dist', 'ex124oj.user.js'),
  `${metadata}\n\n${fs.readFileSync(path.resolve(__dirname, 'dist', 'ex124oj.user.js')).toString()}`);