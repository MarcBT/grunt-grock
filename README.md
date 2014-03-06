# grunt-grock

> A simple grunt task to generate a project's documentation with [Grock](https://github.com/killercup/grock).

## Getting Started
This plugin requires Grunt `0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-grock --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-grock');
```

## The "grock" task

### Usage
In your project's Gruntfile, add a section named `grock` to the data object passed into `grunt.initConfig()`.

Just adapt the following configuration to generate the structured documentation of your files.

```js
grunt.initConfig({
  grock: {
    options: {
      // Grock options
      github: false,
      index: 'Gruntfile.js',
      out: 'docCustomFolder',
      style: 'thin',
      verbose: true
    },
    files: [
      './README.md','./**/*.js', // Generate documentation for these files
      '!./docs/**','!./node_modules/**' //  Do not generate documentation for these files
    ]
  },
});
```

### Options

Take a look at the [`grock` repository](https://github.com/killercup/grock) to see the list of available options.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
