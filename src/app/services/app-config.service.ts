/*
 * This file is part of NxFIFTEEN Fitness Core.
 *
 * @link      https://nxfifteen.me.uk/projects/nxcore/
 * @link      https://gitlab.com/nx-core/frontend/angular
 * @author    Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @copyright Copyright (c) 2020. Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @license   https://nxfifteen.me.uk/api/license/mit/license.html MIT
 */

import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AppConfigService {
  private appConfig;

  constructor(private injector: Injector) {
  }

  get config() {
    return this.appConfig;
  }

  loadAppConfig() {
    const http = this.injector.get(HttpClient);
    return http.get('/assets/app-config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
        if (!this.appConfig.production) {
          console.log('+++ Okay loaded app-config.json');
        }
      }).catch(error => {
        this.appConfig = environment;
        if (!this.appConfig.production) {
          console.log('*** Error loading app-config.json, using environment file instead');
        }
      });
  }
}
