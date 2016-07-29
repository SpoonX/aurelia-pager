import {bindable,bindingMode} from 'aurelia-binding';
import {customElement} from 'aurelia-templating';
import {resolvedView,Config} from 'aurelia-view-manager';

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
export declare function configure(aurelia?: any): any;