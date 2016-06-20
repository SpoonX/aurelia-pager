import {inject, bindingMode, bindable, customElement} from 'aurelia-framework';
import {resolvedView} from 'aurelia-view-manager';
import {Pager} from '../pager';
import {getLogger} from 'aurelia-logging';
import {EntityManager} from 'aurelia-orm';
import {Config} from '../config';

@customElement('resource-pager')
@resolvedView('spoonx/pager', 'pager')
@inject(EntityManager, Config)
export class ResourcePager extends Pager {

  @bindable({defaultBindingMode: bindingMode.oneTime})
  resource

  @bindable({defaultBindingMode: bindingMode.twoWay})
  page = 1

  @bindable({defaultBindingMode: bindingMode.oneTime})
  @bindable repository

  @bindable criteria = {}
  @bindable range    = 3
  @bindable limit    = 30

  constructor(entityManager, config) {
    super(config);
    this.pages = 0;
    this.logger   = getLogger('spoonx/pager');
    this.entityManager = entityManager;
  }

  bind() {
    this.repository = this.repository || this.entityManager.getRepository(this.resource);
    this.reloadCount();
  }

  reloadCount() {
    this.repository.count(this.criteria, true).then(result => {
      this.page = 1;
      this.pages = Math.ceil(result.count / this.limit) || 1;
    }).catch(error => {
      this.logger.error('Something went wrong.', error);
    });
  }

}
