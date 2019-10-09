import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {AppVersion} from '../_models/appVersion';
import {CordovaDevice} from '../_models/cordovaDevice';

declare var device;
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

  constructor(private http: HttpClient) {
    this.updateAvailableSubject = new BehaviorSubject<AppVersion>({
      yourVersion: '',
      latestVersion: '',
      updateAvailable: false,
    });
    this.updateAvailable = this.updateAvailableSubject.asObservable();
  }

  get cordova(): any {
    return _window().cordova;
  }

  get platform(): CordovaDevice {
    if (this.onCordova) {
      return {
        model: _window().cordova.device.model,
        platform: _window().cordova.device.platform,
        version: _window().cordova.device.version,
        manufacturer: _window().cordova.device.manufacturer,
        isVirtual: _window().cordova.device.isVirtual,
        serial: _window().cordova.device.serial,
        uuid: _window().cordova.device.uuid,
      };
    } else {
      return {
        model: '_window().cordova.device.model',
        platform: '_window().cordova.device.platform',
        version: '_window().cordova.device.version',
        manufacturer: '_window().cordova.device.manufacturer',
        isVirtual: '_window().cordova.device.isVirtual',
        serial: '_window().cordova.device.serial',
        uuid: '_window().cordova.device.uuid',
      };
    }
  }

  get onCordova(): Boolean {
    return !!_window().cordova;
  }

  cordovaUpdateAvailable() {
    console.log(`${environment.apiUrl}/cmd/update/cordova/${environment.version}`);
    return this.http.get<any>(`${environment.apiUrl}/cmd/update/cordova/${environment.version}`)
      .subscribe((data) => {
        console.log(data);

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
