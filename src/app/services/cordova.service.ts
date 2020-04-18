/*
 * This file is part of NxFIFTEEN Fitness Core.
 *
 * @link      https://nxfifteen.me.uk/projects/nxcore/angular
 * @link      https://nxfifteen.me.uk/projects/nxcore/
 * @link      https://gitlab.com/nx-core/frontend/angular
 * @author    Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @copyright Copyright (c) 2020. Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @license   https://nxfifteen.me.uk/api/license/mit/license.html MIT
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {AppVersion} from '../_models/appVersion';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class CordovaService {

  private updateAvailableSubject: BehaviorSubject<AppVersion>;
  public updateAvailable: Observable<AppVersion>;
  private readonly apiUrl: string;
  private readonly version: number | string;

  constructor(private http: HttpClient, environment: ConfigService) {
    this.updateAvailableSubject = new BehaviorSubject<AppVersion>({
      yourVersion: environment.app.version,
      latestVersion: environment.app.version,
      updateAvailable: false,
    });
    this.updateAvailable = this.updateAvailableSubject.asObservable();
    this.apiUrl = environment.app.apiUrl;
    this.version = environment.app.version;

    if (this.onCordova) {
      this.cordovaUpdateAvailable();
    }
  }

  get cordova(): any {
    return _window().cordova;
  }

  get onCordova(): Boolean {
    return !!_window().cordova;
  }

  cordovaUpdateAvailable() {
    if (this.onCordova) {
      console.log(`${this.apiUrl}/cmd/update/cordova/${this.version}`);
      return this.http.get<any>(`${this.apiUrl}/cmd/update/cordova/${this.version}`)
        .subscribe((data) => {
          if (data['updateAvailable']) {
            console.log('A New Update is available');
            this.updateAvailableSubject.next(data);
          } else {
            console.log('No Updates are available');
            this.updateAvailableSubject.next(data);
          }
        });
    }
  }
}
