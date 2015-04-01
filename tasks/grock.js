/*
 * grunt-grock
 * https://github.com/MarcBT/grunt-grock
 *
 * Copyright (c) 2014 Marc Beuret
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var grock = require('grock').generator,
      gf    = require('grunt').file;

  grunt.registerMultiTask('grock', 'A simple grunt task to generate a project\'s documentation using Grock.', function() {
    var done    = this.async(),
        options = this.options(),
        grocjson = {},
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
    // Prepare ext-scripts and ext-styles
    extScripts = options.extScripts || grocjson.extScripts;
    extStyles  = options.extStyles || grocjson.extStyles;
    args = {
      'glob': this.filesSrc || grocjson.glob || 'lib/*.coffee',
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
    
    // Perform grock task
    grock(args)
      .then(function () { done(); }) // doc generation successful
      .then(null, function () { done(false); }); // there was an error;

  });

};
