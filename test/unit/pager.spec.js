import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {Config} from 'aurelia-view-manager';

describe('the Pager component', () => {
  let config          = {};
  let nagivationItems = 4;
  let mockItems       = 100;
  let localTestData   = [
    {id: 1, name: 'bob'},
    {id: 2, name: 'henk'},
    {id: 3, name: 'jan'}
  ];
  let component;

  class MockResource {
    count = () => {
      return Promise.resolve({count: mockItems});
    }
  }

  function setConfig(options) {
    for (let attr in options) {
      config[attr] = options[attr];
    }

    return config;
  }

  // setup component for each test
  beforeEach(() => {
    setConfig({
      page: 1,
      pages: 10,
      limit: 30,
      pagerange: 3,
      resource: null,
      criteria: null
    });

    component = StageComponent
      .withResources('src/pager')
      .inView('<pager pages.bind="pages" page.bind="page" limit.bind="limit" pagerange.bind="pagerange" resource.bind="resource" criteria.bind="criteria"></pager>')
      .boundTo(config);

    component.configure = aurelia => {
      aurelia.use.standardConfiguration();

      aurelia.container.get(Config).configureNamespace('aurelia-pager', {
        location: './{{framework}}/{{view}}.html'
      });
    };
  });

  // destroy component after each test
  afterEach(() => {
    component.dispose();
  });

  it('can render the component', done => {
    component.create(bootstrap).then(() => {
      const pageElement = document.querySelector('.active');
      expect(pageElement.innerHTML).toContain('au-target-id');
    }).then(done);
  });

  it('can change the current page', done => {
    component.boundTo(setConfig({page: 3})).create(bootstrap).then(() => {
      const anchorElement = document.querySelector('.active a');
      expect(anchorElement.innerHTML).toBe(config.page.toString());
    }).then(done);
  });

  it('can change the amount of pages', done => {
    component.boundTo(setConfig({pages: 2})).create(bootstrap).then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(config.pages + nagivationItems);
    }).then(done);
  });

  it('can change the pagerange', done => {
    component.boundTo(setConfig({page: 8, pagerange: 2})).create(bootstrap).then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(1 + (config.pagerange * 2) + nagivationItems);
    }).then(done);
  });

  it('can load data from local resource', done => {
    component.boundTo(setConfig({resource: localTestData, limit: 1, pagerange: 1})).create(bootstrap).then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(localTestData.length + nagivationItems);
    }).then(done);
  });

  it('can change the current page from data loaded by local resource', done => {
    component.boundTo(setConfig({resource: localTestData, limit: 1, pagerange: 1, page: 2, pages: 3})).create(bootstrap).then(() => {
      const navElement = document.querySelector('.active a');
      expect(navElement.innerHTML).toBe(config.page.toString());
    }).then(done);
  });

  it('can load data from DB resource', done => {
    component.boundTo(setConfig({resource: new MockResource()})).create(bootstrap).then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(Math.ceil(mockItems / config.limit)  + nagivationItems);
    }).then(done);
  });

  it('must set atleast 1 page', done => {
    mockItems = 0;

    component.boundTo(setConfig({resource: new MockResource()})).create(bootstrap).then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(1 + nagivationItems);
    }).then(done);
  });
});
