# grunt-grock

> A simple grunt task to generate a project's documentation using Grock.

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

### Overview
In your project's Gruntfile, add a section named `grock` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  grock: {
    options: {
      // Task-specific options go here.
    },
    files: {
      src: [/* Files to include into (exclude from) the generated documentation go here. */]
    },
  },
});
```

### Options

The list of available options is presented into the [`grock` repository](https://github.com/killercup/grock).


### Usage Examples

#### Default Options
This configuration generates documentation by using the defaults options defined into the [`grock` repository](https://github.com/killercup/grock).

```js
grunt.initConfig({
  grock: {
    options: {},
    files: {},
  },
});
```

#### Custom Options
This configuration uses the custom `options` to generates a documentation for the files specified in `src`

```js
grunt.initConfig({
  grock: {
    options: {
      github: false,
      index: 'Gruntfile.js',
      out: 'docCustomFolder',
      style: 'thin',
      verbose: true
    },
    files: {
      src: ['./README.md','./**/*.js', '!./docs/**','!./node_modules/**'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
