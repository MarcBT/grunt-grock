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

  grunt.registerMultiTask('grock', 'The best Grunt plugin ever.', function() {
    var done = this.async();
    
    var defaults = {
	  _: [],
	  help: false,
	  '?': false,
	  version: false,
	  V: false,
	  verbose: false,
	  v: false,
	  github: false,
	  glob: ['Gruntfile.js'],
	  out: 'docs',
	  style: 'thin',
	  index: 'Readme.md',
	  i: 'Readme.md',
	  indexes: 'Readme.md',
	  root: '.',
	  'repository-url': false,
	  '$0': 'grock',
	  start: process.hrtime()
	};
    
    var options = this.options;
    
    grock(defaults);
    
  });

};
