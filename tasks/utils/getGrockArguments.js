/*
 * grunt-grock
 * https://github.com/MarcBT/grunt-grock
 *
 * Copyright (c) 2014 Marc Beuret
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(files, options) {

  var gf = require('grunt').file,
      grocjson = {},
      glob, extScripts, extStyles,
      verbose, whitespaceAfterToken,
      args;
  
  // Define default options
  var defaultOptions = {
    'glob': 'lib/*.coffee',
    'out': 'docs/',
    'style': 'solarized',
    'verbose': false,
    'index': 'Readme.md',
    'indexes': 'Readme.md',
    'root': '.',
    'whitespace-after-token': false,
    'ext-scripts': false,
    'ext-styles': false
  };
  
  // Get .groc.json file if one is specified into grunt options
  if (options.hasOwnProperty('grocjson')) {
    if (gf.exists(options.grocjson)) {
      grocjson = gf.readJSON(options.grocjson);
    }
    else {
      console.log('The specified file '+options.grocjson+' does not exist');
    }
  }

  // Build grock's args object
  // Priority :
  //   - Options provided by gruntfile configuration
  //   - Options provided by .groc.json file
  //   - Defaults options
  //
  // Prepare glob, extScripts and extStyles
  glob       = (files.length > 0) ? files : grocjson.glob;
  extScripts = options.extScripts || grocjson.extScripts;
  extStyles  = options.extStyles || grocjson.extStyles;
  // Prepare boolean options
  verbose = (options.hasOwnProperty('verbose')) ? options.verbose : grocjson.verbose;
  whitespaceAfterToken = (options.hasOwnProperty('whitespaceAfterToken')) ? options.whitespaceAfterToken : grocjson.whitespaceAfterToken;
  
  args = {
    'glob': glob || defaultOptions.glob,
    'out': options.out || grocjson.out || defaultOptions.out,
    'style': options.style || grocjson.style || defaultOptions.style,
    'verbose': verbose || defaultOptions.verbose,
    'index': options.index || grocjson.index || defaultOptions.index,
    'indexes': options.indexes || grocjson.indexes || defaultOptions.indexes,
    'root': options.root || grocjson.root || defaultOptions.root,
    'whitespace-after-token': whitespaceAfterToken || defaultOptions['whitespace-after-token'],
    'ext-scripts': (extScripts) ? gf.expand(extScripts) : defaultOptions['ext-scripts'],
    'ext-styles': (extStyles) ? gf.expand(extStyles) : defaultOptions['ext-styles'],
    'start': process.hrtime()
  };
  
  return args;

};
