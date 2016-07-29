import {Config,resolvedView} from 'aurelia-view-manager';
import {bindingMode} from 'aurelia-binding';
import {bindable,customElement} from 'aurelia-templating';

export declare function configure(aurelia?: any): any;
export declare class Pager {
  page: any;
  pagerange: any;
  limit: any;
  criteria: any;
  resource: any;
  pages: any;
  
  // total amount of pages
  attached(): any;
  reloadCount(): any;
  pageChanged(newValue?: any, oldValue?: any): any;
  criteriaChanged(newValue?: any, oldValue?: any): any;
  nextPage(): any;
  prevPage(): any;
  lastPage(): any;
  firstPage(): any;
  goToPage(page?: any): any;
}