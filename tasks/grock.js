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
      getArgs  = require('./utils/getGrockArguments');

  grunt.registerMultiTask('grock', 'A simple grunt task to generate a project\'s documentation using Grock.', function() {
    var done = this.async(),
        args = getArgs(this.data);
    
    // Perform grock task
    grock(args)
      .then(function () { done(); }) // doc generation successful
      .then(null, function () { done(false); }); // there was an error;

  });

};
