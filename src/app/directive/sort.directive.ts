import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import { Sort } from '../../util/sort';

@Directive({
  selector: '[appSort]',
})
export class SortDirective {
  @Input() appSort: Array<any>;

  constructor(private renderer: Renderer2, private targetElem: ElementRef) {}

  @HostListener('click')
  sortData() {
    const sort = new Sort();
    const elem = this.targetElem.nativeElement;
    const order = elem.getAttribute('date-order');
    const type = elem.getAttribute('data-type');
    const property = elem.getAttribute('data-name');
    if (order == 'desc') {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute('data-order', 'asc');
    } else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute('date-order', 'desc');
    }
  }
}
