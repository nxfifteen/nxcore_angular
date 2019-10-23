import {Injectable} from '@angular/core';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {first, take} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService) {
  }

  showInfo(message, title) {
    const toast = this.toastr.info(message, title);
    toast.onHidden.pipe(take(1)).subscribe((action) => this.toasterHiddenHandler(toast));
  }

  toasterHiddenHandler(toast: ActiveToast<any>) {
    this.apiService.siteNewsDisplayed(-1, toast.message).pipe(first())
      .subscribe();
  }
}
