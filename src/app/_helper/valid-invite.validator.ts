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

import {FormGroup} from '@angular/forms';
import {ConfigService} from '../services/config.service';
import {HttpClient} from '@angular/common/http';

// custom validator to check that two fields match
export function ValidInvite(controlName: string, httpClient: HttpClient, environment: ConfigService) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.ValidInvite) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    httpClient.get(`${environment.app.apiUrl}/invite/${control.value}`).subscribe((data) => {
      if (data['status']) {
        control.setErrors(null);
      } else {
        control.setErrors({validInvite: true});
      }
    });
  };
}
