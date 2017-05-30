import {Config as ViewConfig}  from 'aurelia-view-manager';
export {Config as PagerConfig} from './config';

// added for bundling
import {Pager} from './pager'; // eslint-disable-line no-unused-vars

export function configure(aurelia) {
  aurelia.container.get(ViewConfig).configureNamespace('aurelia-pager', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./pager');
}
