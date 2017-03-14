'use strict';

const dragdropway = require('./webpack.config.dragdropway.js');
const formviewer = require('./webpack.config.formviewer.js');
const stepway = require('./webpack.config.stepway.js');

// change to your current webpack config.
// const whichConfig = dragdropway;
const whichConfig = formviewer;
// const whichConfig = stepway;

whichConfig.devServer.contentBase = './';

module.exports = whichConfig;
