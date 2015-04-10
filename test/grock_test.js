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
    grock = require('grock').generator,
    gf = grunt.file;

function testDocGeneration (args, test) {
  var out = args.out,
  files = gf.expand(args.glob),
  index = path.join(out,'index.html');

  test.ok(grunt.file.exists(out + '/toc.js'), 'Output folder not created or empty');
  files.forEach( function(file) {
    var outFile = path.join(out,file.split('./')[1]+'.html');
    test.ok(gf.exists(outFile) || gf.exists(index), 'File ' + outFile + ' not created');
  });
}

function testExpectedOptions (current, expected, test) {
    Object.keys(expected).forEach( function (option) {
    var testOk;
    switch (option) {
        case 'extScripts':
          testOk = ( current['ext-scripts'].toString() === gf.expand(expected[option]).toString() );
          break;
        case 'extStyles':
          testOk = ( current['ext-styles'].toString() === gf.expand(expected[option]).toString() );
          break;
        case 'whitespaceAfterToken':
          testOk = (current['whitespace-after-token'].toString() === expected[option].toString() );
          break;
        default:
          testOk = (current[option].toString() === expected[option].toString());
          break
    }
    test.ok(testOk,'Option '+option+'applied is not the one expected.');
  });
}


exports.grock = {
  setUp: function (done) {
    done();
  },
  
  defaultOptions: function(test) {
    var filesSrc = [],
        options = {},
        expectedArgs = { // grock default options
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
        },
        grockArgs = getArgs(filesSrc, options);
    
    test.expect(1+grunt.util.toArray(expectedArgs).length);
    
    testExpectedOptions (grockArgs, expectedArgs, test);
    
    grock(grockArgs).then(function(){
      testDocGeneration(expectedArgs, test);
      test.done();
    });
  },
  
  areExternalsApplied: function (test) {
    var filesSrc = grunt.config.get('grock').externals.src,
        options = grunt.config.get('grock').externals.options,
        externals = gf.expand(options.extScripts).concat(gf.expand(options.extStyles)),
        expectedArgs = options,
        grockArgs = getArgs(filesSrc, options);

    test.expect(1+grunt.util.toArray(expectedArgs).length+externals.length+gf.expand(filesSrc).length);
    
    testExpectedOptions (grockArgs, expectedArgs, test);
    
    grock(grockArgs).then(function(){
      testDocGeneration(grockArgs, test);
      
      var index = gf.read(path.join(__dirname, '..', options.out, 'index.html'));
      externals.forEach(function(file) {
        var extraContent = gf.read(file);
        test.ok( (index.indexOf(extraContent) > -1), 'Content of external file '+file+ 'has not been inlined');
      });
      test.done();
    });
  },
  
  getGrocJsonOptions: function (test) {
    var filesSrc = [],
        options = grunt.config.get('grock').grocJson.options,
        expectedArgs = gf.readJSON(options.grocjson),
        grockArgs = getArgs(filesSrc, options);

    test.expect(1+grunt.util.toArray(expectedArgs).length+gf.expand(expectedArgs.glob).length);
    
    testExpectedOptions (grockArgs, expectedArgs, test);
    
    grock(grockArgs).then(function(){
      testDocGeneration(expectedArgs, test);
      test.done();
    });
  },
  
  overrideGrocJsonOptions: function (test) {
    var filesSrc = grunt.config.get('grock').grocJsonOverride.src,
        options = grunt.config.get('grock').grocJsonOverride.options,
        expectedArgs = {
          glob: filesSrc,
          index: 'README.md',
          indexes: 'README.md',
          verbose: false,
          out: 'out_grocjson_override'
        },
        grockArgs = getArgs(filesSrc, options);

    test.expect(1+grunt.util.toArray(expectedArgs).length+gf.expand(filesSrc).length);
    
    testExpectedOptions (grockArgs, expectedArgs, test);
    
    grock(grockArgs).then(function(){
      testDocGeneration(expectedArgs, test);
      test.done();
    });
  }
};