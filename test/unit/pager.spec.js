import {StageComponent} from 'aurelia-testing';
import {Pager} from '../../src/pager';

describe('the Pager component', () => {
  let config          = {};
  let nagivationItems = 4;
  let mockItems       = 100;
  let component;
  let eventArg;

  class mockResource {
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
      page     : 1,
      pages    : 10,
      limit    : 30,
      pagerange: 3,
      resource : null,
      criteria : null,
    });

    component = StageComponent
      .withResources('src/pager')
      .inView('<pager pages.bind="pages" page.bind="page" limit.bind="limit" pagerange.bind="pagerange" resource.bind="resource" criteria.bind="criteria"></pager>')
      .boundTo(config);
  });

  // destroy component after each test
  afterEach(() => {
    component.dispose();
  });

  it('can render the component', done => {
    component.create().then(() => {
      const pageElement = document.querySelector('.active');
      expect(pageElement.innerHTML).toContain('au-target-id');
    }).then(done)
  });

  it('can change the current page', done => {
    component.boundTo(setConfig({page: 3})).create().then(() => {
      const anchorElement = document.querySelector('.active a');
      expect(anchorElement.innerHTML).toBe(config.page.toString());
    }).then(done);
  });

  it('can change the amount of pages', done => {
    component.boundTo(setConfig({pages: 2})).create().then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(config.pages + nagivationItems);
    }).then(done);
  });

  it('can change the pagerange', done => {
    component.boundTo(setConfig({page: 8, pagerange: 2})).create().then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(1 + (config.pagerange * 2) + nagivationItems);
    }).then(done);
  });

  it('can load data from local resource', done => {
    let data = [{id: 1, name: 'bob'}, {id: 2, name: 'henk'}, {id: 3, name: 'jan'}];

    component.boundTo(setConfig({resource: data, limit: 1, pagerange: 1})).create().then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(data.length + nagivationItems);
    }).then(done);
  });

  it('can change the current page from data loaded by local resource', done => {
    let data = [{id: 1, name: 'bob'}, {id: 2, name: 'henk'}, {id: 3, name: 'jan'}];

    component.boundTo(setConfig({resource: data, limit: 1, pagerange: 1, page: 2})).create().then(() => {
      const navElement = document.querySelector('.active a');
      expect(navElement.innerHTML).toBe(config.page.toString());
    }).then(done);
  });

  it('can load data from DB resource', done => {
    component.boundTo(setConfig({resource: new mockResource()})).create().then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(Math.ceil(mockItems / config.limit)  + nagivationItems);
    }).then(done);
  });

  it('must set atleast 1 page', done => {
    mockItems = 0;

    component.boundTo(setConfig({resource: new mockResource()})).create().then(() => {
      const navElement = document.querySelector('.pagination').getElementsByTagName('li');
      expect(navElement.length).toBe(1 + nagivationItems);
    }).then(done);
  });
});
