import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {MatomoService} from '../../services/matomo.service';

@Component({
  templateUrl: './activity_log_details.component.html'
})
export class ActivityLogDetailsComponent implements OnInit {
  currentUser: User;
  actvitiyId: number;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _ActivatedRoute: ActivatedRoute,
              private _matomoService: MatomoService
  ) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    }

    this._ActivatedRoute.paramMap.subscribe(params => {
      // tslint:disable-next-line:radix
      this.actvitiyId = parseInt(params.get('id'));
    });

    console.log(this.actvitiyId);
  }

}
