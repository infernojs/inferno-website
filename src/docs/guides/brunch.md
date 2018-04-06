# Brunch

A modern JS skeleton with Inferno for Brunch.

[Brunch](http://brunch.io/) is a builder. Not a generic task runner, but a specialized tool focusing on the production of a small number of deployment-ready files from a large number of heterogenous development files or trees.
In this guide you'll find everything you need to know in order to get your next [Inferno](http://infernojs.org) project started using Brunch.

## Requirements

Make sure you have the following dependencies installed and up to date:
* [Node.js](http://nodejs.org): `brew install node` on macOS
* [Brunch](http://brunch.io): `npm install -g brunch`.

## Getting started

In order to create a new Inferno project using Brunch just type:
```
brunch new my-inferno-proj -s inferno
```

Your new project will have the following file structure:
```
.
|-- LICENSE
|-- README.md
|-- app
|   |-- assets
|   |   `-- index.html
|   |-- components
|   |   `-- banner.js
|   |-- initialize.js
|   `-- styles
|       `-- app.css
|-- public
|-- brunch-config.js
|-- node_modules
`-- package.json
```

Start working on your project in the `app` folder by typing `npm start`. This will automatically & efficiently rebuild the app on every change and launch a HTTP server. The default location for the server is `http://localhost:3333`. The build is located in the `public` folder.

When your app is ready for production, type `npm run prod`. This command will build your app for production and put it in the `public` folder.

## Core concepts

Any Brunch project consists of the following:

* a *config*, which allows you to customize various aspects of Brunch, as well as configure plugins (see [config reference](http://brunch.io/docs/config))
* *package.json*, which lists the plugins you want Brunch to use, as well as your app's own dependencies
  * a *plugin* is what allows Brunch to provide any custom behavior or handle all the various JS-/CSS- transpiled languages for you (see [using plugins](http://brunch.io/docs/using-plugins) and [plugins list](http://brunch.io/plugins) to get an idea)
* *source files* — files that you author in your preferred language, which later get compiled into either JS or CSS
* *assets* — files that are copied as-is (in some cases these can be compiled too, e.g. Jade → HTML)
* *vendor files* — JS and CSS files that do not need any processing
* *output files* refer to the browser-ready JS bundles or stylesheets, which are obtained by joining your source files into one

What Brunch does, in essence, is this:

1. compile your source files using appropriate plugins
2. concatenate several compiled source files into one
3. write the result into a file
4. copy assets

That's all there is, really. While Brunch does assume your code is going to live under app/ and your assets under app/assets/, and build result is put under public/, you are by all means free to use your own structure.

## Adding modules & global modules

Adding new modules is as simple as installing them via npm and importing them in your code.

Let's add [bluebird](http://bluebirdjs.com/docs/getting-started.html) for example:
```
npm install bluebird --save
```

Then import the module:

```
import Promise from 'bluebird';
```

You can also define global modules. Both `Inferno` and `Component` are global modules, which means you can use them without `import` or `require`.
You can also add any other global module you desire.

Let's define [bluebird](http://bluebirdjs.com/docs/getting-started.html) as a global module for example:

```
npm install bluebird --save
```

Then update `brunch-config.js` as follows:

```
module.exports = {
  npm: {
    globals: {
      Inferno: 'inferno',
      Promise: 'bluebird' // Added bluebird
    }
  },
  files: {
    javascripts: { joinTo: 'app.js' },
    stylesheets: { joinTo: 'app.css' }
  },
  modules: {
    autoRequire: { 'app.js': ['initialize'] }
  }
};
```

Now you can use `Promise` without importing!

## Using brunch plugins

Brunch plugins can fall into three broad categories (one plugin can belong to several at the same time!):

* *Compilers.* These are responsible for compiling your source files into something a browser would understand. For example, a CoffeeScript (to JS) compiler; or a Stylus (to CSS) compiler.
* *Linters.* These try to prevent certain kinds of mistakes, or enforce a particular coding style, during the build time.
* *Optimizers.* As the name implies, they optimize compiled JS or CSS files. Examples of optimizers include: a JavaScript uglifier; a CSS prefixer and minifier.

You can browse some of the community-supported plugins in the [Brunch plugins section](http://brunch.io/plugins).

Let's add `SASS` support to our app for example:

```
npm install sass-brunch --save-dev
```

Plugins are usable out-of-the-box. However, sometimes you will need to customize how they work, to make them suit your application. Refer to the plugin's README on details regarding configuration.

Let's set the precision for arithmetic operations for example. Our new `brunch-config.js` would look like this:

```
module.exports = {
  npm: {
    globals: {
      Inferno: 'inferno',
      Promise: 'bluebird'
    }
  },
  files: {
    javascripts: { joinTo: 'app.js' },
    stylesheets: { joinTo: 'app.css' }
  },
  plugins: {
    sass: {
      precision: 8 // Added precision for arithmetic operations
    }
  },
  modules: {
    autoRequire: { 'app.js': ['initialize'] }
  }
};
```

## More brunch

If you want to learn more about brunch, consult:

* [Brunch: Getting started](http://brunch.io/docs/getting-started)
* [Brunch: Using JS modules and NPM](http://brunch.io/docs/using-modules)
* [Brunch: Config](http://brunch.io/docs/config)
