'use strict';

var grunt = require('grunt');
var gf = grunt.file;

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

exports.grock = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  custom_options: function(test) {
    // Tests :
    // Check if Folder 'out' has been created
    // Checks if documentation files have been created
    
    var config = grunt.config.get('grock');
    var outFolder = config.options.out;
    var files = gf.expand(config.files);
    var index = outFolder + '/index.html';
        
    test.expect(1 + files.length);
        
    test.ok(grunt.file.exists(outFolder+ '/toc.js'), 'Output folder not created or empty');
    for (var i = 0; i<files.length; i++){
      var outFile = outFolder + '/' + files[i].split('./')[1] + '.html';
      test.ok(gf.exists(outFile) || gf.exists(index), 'File ' + outFile + ' not created');
    }
        
    test.done();

  }
};
