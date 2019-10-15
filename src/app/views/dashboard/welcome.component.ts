import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MarkdownService} from 'ngx-markdown';
import {ApiService} from '../../services/api.service';
import {MatomoService} from '../../services/matomo.service';
import {CordovaService} from '../../services/cordova.service';

@Component({
  templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private titleService: Title,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _matomoService: MatomoService,
              private _cordovaService: CordovaService) {
  }

  ngOnInit(): void {
    this._matomoService.setupTracking('Core | Welcome');
    this._matomoService.doTracking();
  }
}
