/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

'use strict';

var grunt = require('grunt'),
    path = require('path'),
    fs = require('fs'),
    getArgs = require('../tasks/utils/getGrockArguments'),
    gf = grunt.file;

exports.grock = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  isDocGenerated: function (test) {
    // Tests :
    // Check if Folder 'out' has been created
    // Checks if documentation files have been created
    
    var configs = grunt.util.toArray(grunt.config.get('grock')),
        assertionCount = 0,
        out, index, files;
    
    // Check each grunt-grock configuration defined
    configs.forEach( function (config) {
      
      // Get arguments build from the configuration
      config = getArgs(config);
      out = config.out;
      files = gf.expand(config.glob);
      index = path.join(out,'index.html');

      // Update assertion number expected
      assertionCount += 1+files.length;
      
      // Perform tests
      test.ok(grunt.file.exists(out + '/toc.js'), 'Output folder not created or empty');
      files.forEach( function(file) {
        var outFile = path.join(out,file.split('./')[1]+'.html');
        test.ok(gf.exists(outFile) || gf.exists(index), 'File ' + outFile + ' not created');
      });

      
    });
    
    test.expect(assertionCount);
    test.done();

  },
  areExternalsApplied: function (test) {
    // Tests :
    // Check if external styles have been inlined into generated doc files

    var options = grunt.config.get('grock').externals.options,
        externals = gf.expand(options.extScripts).concat(gf.expand(options.extStyles)),
        index = gf.read(path.join(__dirname, '..', options.out, 'index.html'));

    test.expect(externals.length);
    
    externals.forEach(function(file) {
      var extraContent = gf.read(file);
      test.ok( (index.indexOf(extraContent) > -1), 'Content of external file '+file+ 'has not been inlined');
    });
    
    test.done();
  },
  getGrocJsonOptions: function (test) {
    // Tests :
    // Check if options from .groc.json are correctly passed to the args object
    var config = grunt.config.get('grock').grocJson,
        original = gf.readJSON(config.options.grocjson),
        generated = getArgs(config),
        options = Object.keys(original);
    
    test.expect(options.length);
    
    options.forEach( function (option) {
      test.ok(generated[option].toString() === original[option].toString(), 'Option '+option+' of.groc.json is not correctly passed to grock');
    });
    
    test.done();
  }
};