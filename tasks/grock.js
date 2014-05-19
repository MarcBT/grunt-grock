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

  var grock = require('grock').generator;

  grunt.registerMultiTask('grock', 'A simple grunt task to generate a project\'s documentation using Grock.', function() {
    var done = this.async(),
        options = this.options(),
        glob = (this.filesSrc && this.filesSrc.length > 0) ? this.filesSrc : 'lib/*.coffee';

    var args = {
      'glob': glob,
      'out': options.out || 'docs/',
      'style': options.style || 'solarized',
      'verbose': options.verbose || false,
      'index': options.index ||'Readme.md',
      'root': options.root || '.',
      'github': options.github || false,
      'whitespace-after-token': options.whitespaceAfterToken || false,
      'start': process.hrtime()
    };

    grock(args)
      .then(function () { done(); }) // doc generation successful
      .then(null, function () { done(false); }); // there was an error;

  });

};
