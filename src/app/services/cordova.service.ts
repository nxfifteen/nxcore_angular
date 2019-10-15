import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
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

  constructor(private http: HttpClient) {
    this.updateAvailableSubject = new BehaviorSubject<AppVersion>({
      yourVersion: environment.version,
      latestVersion: environment.version,
      updateAvailable: false,
    });
    this.updateAvailable = this.updateAvailableSubject.asObservable();

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
      console.log(`${environment.apiUrl}/cmd/update/cordova/${environment.version}`);
      return this.http.get<any>(`${environment.apiUrl}/cmd/update/cordova/${environment.version}`)
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
