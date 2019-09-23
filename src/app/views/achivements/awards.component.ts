import {Component, OnInit} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';

@Component({
  templateUrl: 'awards.component.html'
})
export class AwardsComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  awardsSummaries = [];
  factor: number;
  level: number;
  xp: number;
  xpLog = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/setup']);
    } else {
      this.pullToRefresh();
    }
  }

  pullToRefresh(): void {
    this.loading = 0;
    this.loadingExpected = 1;

    this.apiService.getAchievementsAwards().subscribe((data) => {

      this.awardsSummaries = [];
      if (data['awards']) {
        this.awardsSummaries = Object.keys(data['awards']).map(it => data['awards'][it]);
      }
      this.xpLog = [];
      if (data['xp_log']) {
        this.xpLog = Object.keys(data['xp_log']).map(it => data['xp_log'][it]);
      }

      this.factor = data['factor'];
      this.level = data['level'];
      this.xp = data['xp'];

      this.loading++;
    });
  }
}

