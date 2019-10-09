import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import {ApiService} from './api.service';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class CordovaService {

  private resume: BehaviorSubject<boolean>;

  constructor(private zone: NgZone,
              private apiService: ApiService) { }

  get cordova(): any {
    return _window().cordova;
  }

  get onCordova(): Boolean {
    return !!_window().cordova;
  }

  cordovaUpdateAvailable() {
    this.apiService.getCordovaUpdate().subscribe((data) => {
      console.log(data);
    });
  }

  public onResume(): void {
    this.resume.next(true);
  }
}
