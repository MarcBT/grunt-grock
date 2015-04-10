/*
 * grunt-grock
 * https://github.com/MarcBT/grunt-grock
 *
 * Copyright (c) 2014 Marc Beuret
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: [
        'doc*/',
        'out_*/'
      ]
    },

    // Configuration to be run (and then tested).
    grock: {
      options: {
        // Grock options
        index: 'Gruntfile.js',
        style: 'thin',
        verbose: true
      },
      files: [
        './README.md','./**/*.js', // Generate documentation for these files
        '!./docs/**','!./node_modules/**' //  Do not generate documentation for these files
      ],
      main: {
        options: {
          index: 'Gruntfile.js',
          out: 'out_main',
          style: 'thin',
          verbose: true,
        },
        src : [
          './README.md','./**/*.js', '!./docs/**',
          '!./<%= grock.main.options.out %>/**',
          '!./<%= grock.externals.options.out %>/**',
          '!./node_modules/**'
        ]
      },
      externals: {
        options: {
          index: 'Gruntfile.js',
          out: 'out_externals',
          style: 'thin',
          extScripts: ['./externals/js/*.js'],
          extStyles: ['./externals/css/*.css'],
        },
        src : [
          './README.md','./**/*.js', '!./docs/**',
          '!./<%= grock.main.options.out %>/**',
          '!./<%= grock.externals.options.out %>/**',
          '!./node_modules/**'
        ]
      },
      grocJson: {
        options: {
          grocjson: '.groc.json'
        }
      },
      grocJsonOverride: {
        options: {
          grocjson: '.groc.json',
          index: 'README.md',
          indexes: 'README.md',
          verbose: false,
          out: 'out_grocjson_override'
        },
        src : [
          '*.json',
          '*.md',
          'Gruntfile.js',
          'tasks/**/*.js',
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'grock', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
