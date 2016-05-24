# Pager
Pagination / pager module for aurelia.

## Bindables

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

#### limit (optional)
This will set the amount of items on a page and will be used to calculate the amount of pages, default is 30.

#### repository (optional)
Will override the `pages` option.

Fetches the count from the DB using [aurelia-orm](https://github.com/SpoonX/aurelia-orm).
Expects that the amount of pages is located in the `count` property.

#### criteria (optional)
This option only works when `repository` is enabled.
Parameter gets passed straight to the query field of `repository.count`.

Example (sailsjs/waterline or express):

```javascript:
{
  disabled : 0,
  createdAt: {'>', '2016-01-01'}
}
```

### Events

## pageChanged

When the current page changes, the event `pageChanged` will be emitted with the following object through the [EventAggregator](https://github.com/aurelia/event-aggregator)

```javascript
{
  page: 1
}
```

## updateCriteria

It will listen to `updateCriteria`, if emmited it will reload the criteria and to go page 1.

## Example:


```html
<template>
  <require from="./pager"></require>

  <pager pages.bind="$amountOfPages" page.bind="1" pagerange.bind="2"></pager>
<template>
```

Using a repository:

```html
<template>
  <require from="./pager"></require>

  <pager repository.bind="exampleRepository"></pager>
<template>
```

Using criteria:

```html
<template>
  <require from="./pager"></require>

  <pager repository.bind="usersRepository" criteria.bind="{disabled: 0}"></pager>
<template>
```
