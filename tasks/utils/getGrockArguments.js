/*
 * grunt-grock
 * https://github.com/MarcBT/grunt-grock
 *
 * Copyright (c) 2014 Marc Beuret
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(config) {

  var gf = require('grunt').file,
      options = config.options(),
      grocjson = {},
      glob,
      extScripts,
      extStyles,
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
  glob       = (config.filesSrc.length > 0) ? config.filesSrc : grocjson.glob;
  extScripts = options.extScripts || grocjson.extScripts;
  extStyles  = options.extStyles || grocjson.extStyles;
  
  args = {
    'glob': glob || 'lib/*.coffee',
    'out': options.out || grocjson.out || 'docs/',
    'style': options.style || grocjson.style || 'solarized',
    'verbose': options.verbose || grocjson.verbose || false,
    'index': options.index ||grocjson.index || 'Readme.md',
    'indexes': options.indexes || grocjson.indexes || 'Readme.md',
    'root': options.root || grocjson.root || '.',
    'whitespace-after-token': options.whitespaceAfterToken || grocjson.whitespaceAfterToken || false,
    'ext-scripts': (extScripts) ? gf.expand(extScripts) : false,
    'ext-styles': (extStyles) ? gf.expand(extStyles) : false,
    'start': process.hrtime()
  };
  
  return args;

};
