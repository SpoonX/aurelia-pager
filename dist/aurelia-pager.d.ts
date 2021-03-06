import {Config,resolvedView} from 'aurelia-view-manager';
import {bindingMode} from 'aurelia-binding';
import {bindable,customElement} from 'aurelia-templating';

// added for bundling
// eslint-disable-line no-unused-vars
export declare function configure(aurelia?: any): any;
export declare class Pager {
  page: any;
  resourceCount: any;
  pagerange: any;
  limit: any;
  criteria: any;
  resource: any;
  pages: any;
  onPageChanged: any;
  
  // optional event to call when page value changes
  attached(): any;
  reloadCount(): any;
  pagesChanged(): any;
  pageChanged(newValue?: any, oldValue?: any): any;
  criteriaChanged(newValue?: any, oldValue?: any): any;
  nextPage(): any;
  prevPage(): any;
  lastPage(): any;
  firstPage(): any;
  goToPage(page?: any): any;
}