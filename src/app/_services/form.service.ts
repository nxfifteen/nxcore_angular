import {Injectable} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {}

  searchTemplate(propertyValues$: String[], propertyClick: Subject<string>, propertyFocus: Subject<string>) {
    return (text$: Observable<string>) => {
      const propertyValues = propertyValues$;
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());

      return merge(debouncedText$, propertyFocus).pipe(
        map(term => (term === '' ? propertyValues
          : propertyValues.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    };
  }
}
