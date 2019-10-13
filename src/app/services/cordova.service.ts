import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppVersion} from '../_models/appVersion';
import {CordovaDevice} from '../_models/cordovaDevice';

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

  private cordovaDeviceSubject: BehaviorSubject<CordovaDevice>;
  public cordovaDevice: Observable<CordovaDevice>;

  constructor(private http: HttpClient) {
    this.updateAvailableSubject = new BehaviorSubject<AppVersion>({
      yourVersion: environment.version,
      latestVersion: environment.version,
      updateAvailable: false,
    });
    this.updateAvailable = this.updateAvailableSubject.asObservable();

    this.cordovaDeviceSubject = new BehaviorSubject<CordovaDevice>({
      model: '_window().cordova.device.model',
      platform: '_window().cordova.device.platform',
      version: '_window().cordova.device.version',
      manufacturer: '_window().cordova.device.manufacturer',
      isVirtual: '_window().cordova.device.isVirtual',
      serial: '_window().cordova.device.serial',
      uuid: '_window().cordova.device.uuid',
    });
    this.cordovaDevice = this.cordovaDeviceSubject.asObservable();

    // this.cordovaUpdateAvailable();
  }

  get cordova(): any {
    return _window().cordova;
  }

  get onCordova(): Boolean {
    return !!_window().cordova;
    // return true;
  }

  cordovaUpdateAvailable() {
    if (this.onCordova) {
      console.log(`${environment.apiUrl}/cmd/update/cordova/${environment.version}`);
      this.http.get<any>(`${environment.apiUrl}/cmd/update/cordova/${environment.version}`)
        .subscribe((data) => {
          if (data['updateAvailable']) {
            console.log('A New Update is available');
            this.updateAvailableSubject.next(data);
          } else {
            console.log('No Updates are available');
            this.updateAvailableSubject.next(data);
          }
        });

      if (typeof this.cordova !== 'undefined') {
        this.cordovaDeviceSubject.next({
          model: this.cordova.device.model,
          platform: this.cordova.device.platform,
          version: this.cordova.device.version,
          manufacturer: this.cordova.device.manufacturer,
          isVirtual: this.cordova.device.isVirtual,
          serial: this.cordova.device.serial,
          uuid: this.cordova.device.uuid,
        });
      }
    }
  }
}
