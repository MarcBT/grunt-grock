/*
 * grunt-grock
 * https://github.com/MarcBT/grunt-grock
 *
 * Copyright (c) 2014 Marc Beuret
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(data) {

  var gf = require('grunt').file,
      options = data.options,
      grocjson = {},
      glob, extScripts, extStyles,
      verbose, whitespaceAfterToken,
      args;
  
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
  glob       = (data.src && data.src.length > 0) ? data.src : grocjson.glob;
  extScripts = options.extScripts || grocjson.extScripts;
  extStyles  = options.extStyles || grocjson.extStyles;
  // Prepare boolean options
  verbose = (options.hasOwnProperty('verbose')) ? options.verbose : grocjson.verbose;
  whitespaceAfterToken = (options.hasOwnProperty('whitespaceAfterToken')) ? options.whitespaceAfterToken : grocjson.whitespaceAfterToken;
  
  args = {
    'glob': glob || 'lib/*.coffee',
    'out': options.out || grocjson.out || 'docs/',
    'style': options.style || grocjson.style || 'solarized',
    'verbose': verbose || false,
    'index': options.index || grocjson.index || 'Readme.md',
    'indexes': options.indexes || grocjson.indexes || 'Readme.md',
    'root': options.root || grocjson.root || '.',
    'whitespace-after-token': whitespaceAfterToken || false,
    'ext-scripts': (extScripts) ? gf.expand(extScripts) : false,
    'ext-styles': (extStyles) ? gf.expand(extStyles) : false,
    'start': process.hrtime()
  };
  
  return args;

};
