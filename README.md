# Pager

Pagination / pager module for aurelia. Works well with [aurelia-paged](http://aurelia-orm.spoonx.org/components.html).

## Uses

Aurelia-pager needs following plugins installed and configured:

* [aurelia-view-manager](https://www.npmjs.com/package/aurelia-view-manager)

## Used by

Following plugins need an installation of aurelia-pager:

* [aurelia-datatable](https://www.npmjs.com/package/aurelia-datatable).

## Installation

### Aureli-Cli

Run `npm i aurelia-pager --save` from your project root.

And add the following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`:

```js
"dependencies": [
  {
    "name": "aurelia-pager",
    "path": "../node_modules/aurelia-pager/dist/amd",
    "main": "aurelia-pager",
    "resources": [
      "bootstrap/pager.html"
    ]
  },
  // ...
],
```

### Jspm

Run `jspm i aurelia-pager` from your project root.

And add following to the `bundles.dist.aurelia.includes` section of `build/bundles.js`:

```js
 "aurelia-pager",
 "[aurelia-pager/**/*.js]",
 "aurelia-pager/**/*.html!text",
```

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

### Webpack

Run `npm i aurelia-pager --save` from your project root.

And add `aurelia-pager` in the `coreBundles.aurelia` section of your `webpack.config.js`.

### Webpack - aurelia-pal

If your project is using PLATFORM.moduleName. Then you will need to register the plugin as follows.

`aurelia.use.plugin(PLATFORM.moduleName('aurelia-pager'));`

In your webpack.config.js you will need to add an import. By default the import looks like this

`const { AureliaPlugin } = require('aurelia-webpack-plugin');`

You need to change it as follows

`const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');`

Next find the plugins export which currently looks like this
```
plugins: [
    new AureliaPlugin(),
    new ProvidePlugin({
      'Promise': 'bluebird',
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    })...
```

You can then add the following
```
    new ModuleDependenciesPlugin({
      "aurelia-pager": ['./bootstrap/pager.html', './pager']
    })...
```
The plugins export would now looks something like this
```
plugins: [
    new AureliaPlugin(),
    new ProvidePlugin({
      'Promise': 'bluebird',
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ModuleDependenciesPlugin({
      "aurelia-pager": ['./bootstrap/pager.html', './pager']
    })...
```

### Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, run `typings i github:spoonx/aurelia-pager` or add `"aurelia-pager": "github:spoonx/aurelia-pager",` to your `typings.json` and run `typings i`.

## Usage

### Bindables

#### page (optional)

The current page, default is 1.

#### pages

The amount of pages.

#### pagerange (optional)

The range of the pages to view, default is 3.

Example:

Range is 2: `3  4  [5]  6  7`, `[1] 2  3  4  5`

Range is 3: `2  3  4  [5]  6  7 8`, `[1] 2  3  4  5  6  7`

The amount of displaying is `range` * 2 + `current page`

#### onPageChanged (optional)

This will be called when the page value changes.
The function should match the signature.

`HandlePageChanged(newValue, oldValue);`

##### limit (optional)

This will set the amount of items on a page and will be used to calculate the amount of pages, default is 30.

##### resource (optional)

Will override the `pages` option.

###### Using a database

Fetches the count from the DB using [aurelia-orm](https://github.com/SpoonX/aurelia-orm).
Expects that the amount of pages is located in the `count` property.

###### Using an array

Calculates the pages based on the amount of items in the array and the limit.

##### criteria (optional)

This option only works when `resource` is enabled and comes from the DB.
Parameter gets passed straight to the query field of `.count()`.

Example (sailsjs/waterline or express):

```javascript:
{
  disabled : 0,
  createdAt: {'>', '2016-01-01'}
}
```

### Changing framework

You can override the framework used for the datatable with any of the [supported ones](https://github.com/SpoonX/aurelia-pager/tree/master/src) using the [aurelia-view-manager](https://github.com/spoonx/aurelia-view-manager).

### Examples

```html
<pager pages.bind="$amountOfPages" page.bind="1" pagerange.bind="2"></pager>
```

Using a resource:

```js
this.localData = [{id: 1, name: 'bob'}, {id: 2, name: 'henk'}, {id: 3, name: 'jan'}];
```

```html
<pager resource.bind="localData"></pager>
```

Using criteria (using [aurelia-orm](https://github.com/SpoonX/aurelia-orm):

```js
this.dbData = entityManager.getRepository('users');
```

```html
<pager repository.bind="dbData" criteria.bind="{disabled: 0}"></pager>
```
