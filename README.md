# Pager
Pagination / pager module for aurelia. Works well with aurelia-paged.

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

#### resource (optional)
Will override the `pages` option.

###### Using a database
Fetches the count from the DB using [aurelia-orm](https://github.com/SpoonX/aurelia-orm).
Expects that the amount of pages is located in the `count` property.

###### Using an array
Calculates the pages based on the amount of items in the array and the limit.

#### criteria (optional)
This option only works when `resource` is enabled and comes from the DB.
Parameter gets passed straight to the query field of `.count()`.

Example (sailsjs/waterline or express):

```javascript:
{
  disabled : 0,
  createdAt: {'>', '2016-01-01'}
}
```

## Custom html
You can override the html with your own by configuring it through the [aurelia-view-manager](https://github.com/spoonx/aurelia-view-manager).

## Examples:

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

Using together with [aurelia-paged](https://github.com/SpoonX/aurelia-paged):

```html
<paged resource.bind="localData" data.bind="data" page.bind="page">
  <div class="user" repeat.for="user of data">
    ${user.id} - ${user.name}
  </div>
</paged>

<pager resource.bind="localData" page.bind="page"></pager>
```
