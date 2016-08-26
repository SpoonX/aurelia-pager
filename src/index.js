import {Config} from 'aurelia-view-manager';

// added for bundling
import {Pager} from './pager'; // eslint-disable-line no-unused-vars

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('aurelia-pager', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./pager');
}
