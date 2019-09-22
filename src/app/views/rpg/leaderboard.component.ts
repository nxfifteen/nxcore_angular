import {Component, OnInit} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {Friends} from '../../_models/friends';

@Component({
  templateUrl: 'leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  profileAvatar: string;

  rpgFriends: Array<Friends>;
  ragFriendsHighestSteps: number;

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
    this.loadingExpected = 2;

    this.apiService.getProfile().subscribe((data) => {
      this.profileAvatar = data['avatar'];
      this.loading++;
    });

    this.apiService.getRpgFriends().subscribe((data) => {
      this.rpgFriends = data['friends'];
      this.ragFriendsHighestSteps = data['maxSteps'];
      this.loading++;
    });
  }
}

