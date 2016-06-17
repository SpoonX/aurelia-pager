import {Pager} from './pager';
import {getLogger} from 'aurelia-logging';

@customElement('resource-pager')
@resolvedView('spoonx/pager', 'pager')
export class ResourcePager extends Pager {

  @bindable resource = null
  @bindable criteria = {}

  constructor() {
    super();
    this.logger = getLogger('spoonx/pager');
  }

  resourceChanged(a) {
    this.change(1);
    this.resource.count(this.criteria, true).then(result => {
      this.pages = Math.ceil(result.count / this.limit) || 1;
    }).catch(error => {
      this.logger.error('Something went wrong.', error);
    });
  }

}
