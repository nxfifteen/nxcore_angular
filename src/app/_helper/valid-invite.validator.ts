import {FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

// custom validator to check that two fields match
export function ValidInvite(controlName: string, httpClient: HttpClient) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.ValidInvite) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    httpClient.get(`${environment.apiUrl}/invite/${control.value}`).subscribe((data) => {
      if (data['status']) {
        control.setErrors(null);
      } else {
        control.setErrors({validInvite: true});
      }
    });
  };
}
