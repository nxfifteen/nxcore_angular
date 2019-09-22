import {Component, OnInit} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {ChallengePending} from '../../_models/challengePending';
import {ChallengeActive} from '../../_models/challengeActive';

@Component({
  templateUrl: 'pvp.component.html'
})
export class PvpComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  profileAvatar: string;
  acceptChallenge: Function;
  rejectChallenge: Function;
  selectedInboxChallenge: number;
  selectedOutboxChallenge: number;
  rpgChallengeSummary: { win: number; lose: number; draw: number };
  rpgChallengeToAccept: Array<ChallengePending>;
  rpgChallengePending: Array<ChallengePending>;
  rpgChallengeRunning: Array<ChallengeActive>;
  rpgChallengeCompleted: Array<ChallengeActive>;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService) {
    this.rpgChallengeToAccept = [];

    this.acceptChallenge = function (id, i) {
      console.log(id);
      console.log(i);
      // noinspection JSPotentiallyInvalidUsageOfClassThis
      this.selectedInboxChallenge = i;
    };

    this.rejectChallenge = function (id, i) {
      console.log(id);
      console.log(i);
      // noinspection JSPotentiallyInvalidUsageOfClassThis
      this.selectedOutboxChallenge = i;
    };
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

    this.apiService.getRpgPvp().subscribe((data) => {
      this.rpgChallengeSummary = {
        win: data['rpg_challenge_friends']['score']['win'],
        lose: data['rpg_challenge_friends']['score']['lose'],
        draw: data['rpg_challenge_friends']['score']['draw'],
      };

      this.rpgChallengeToAccept = [];
      for (let i = 0; i < data['rpg_challenge_friends']['toAccept'].length; i++) {
        this.rpgChallengeToAccept.push(data['rpg_challenge_friends']['toAccept'][i]);
      }

      this.rpgChallengePending = [];
      for (let i = 0; i < data['rpg_challenge_friends']['pending'].length; i++) {
        this.rpgChallengePending.push(data['rpg_challenge_friends']['pending'][i]);
      }

      this.rpgChallengeRunning = [];
      for (let i = 0; i < data['rpg_challenge_friends']['running'].length; i++) {
        this.rpgChallengeRunning.push(data['rpg_challenge_friends']['running'][i]);
      }

      this.rpgChallengeCompleted = [];
      for (let i = 0; i < data['rpg_challenge_friends']['completed'].length; i++) {
        this.rpgChallengeCompleted.push(data['rpg_challenge_friends']['completed'][i]);
      }

      this.loading++;
    });


  }

  private markdownString(datumElementElement: string) {
    return this.markdownService.compile(datumElementElement).replace('<p>', '').replace('</p>', '');
  }
}

