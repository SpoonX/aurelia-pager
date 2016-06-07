import { Config } from './config';

export function configure(aurelia, cb) {
  cb = typeof cb === 'function' ? cb : function () {};

  aurelia.globalResources('./pager');

  cb(aurelia.container.get(Config));
}