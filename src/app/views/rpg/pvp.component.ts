import {Component, OnInit, ViewChild} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {ChallengePending} from '../../_models/challengePending';
import {ChallengeActive} from '../../_models/challengeActive';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';
import {FormService} from '../../_services/form.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  newChallengeForm: FormGroup;
  submittingForm = false;
  submitted = false;

  @ViewChild('editorNameInstance', {static: true}) challengeFriendsInstance: NgbTypeahead;
  challengeFriendsFocus$ = new Subject<string>();
  challengeFriendsClick$ = new Subject<string>();
  selectedChallengeFriends: any;
  searchChallengeFriends: (text$: Observable<string>) => Observable<String[]>;

  @ViewChild('editorNameInstance', {static: true}) challengeCriteriaInstance: NgbTypeahead;
  challengeCriteriaFocus$ = new Subject<string>();
  challengeCriteriaClick$ = new Subject<string>();
  selectedChallengeCriteria: any;
  searchChallengeCriteria: (text$: Observable<string>) => Observable<String[]>;

  @ViewChild('editorNameInstance', {static: true}) challengeDurationsInstance: NgbTypeahead;
  challengeDurationsFocus$ = new Subject<string>();
  challengeDurationsClick$ = new Subject<string>();
  selectedChallengeDurations: any;
  searchChallengeDurations: (text$: Observable<string>) => Observable<String[]>;

  @ViewChild('editorNameInstance', {static: true}) challengeTargetsInstance: NgbTypeahead;
  challengeTargetsFocus$ = new Subject<string>();
  challengeTargetsClick$ = new Subject<string>();
  selectedChallengeTargets: any;
  searchChallengeTargets: (text$: Observable<string>) => Observable<String[]>;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private formService: FormService,
              private formBuilder: FormBuilder) {
    this.rpgChallengeToAccept = [];

    this.newChallengeForm = this.formBuilder.group({
      friend: ['', Validators.required],
      target: ['', Validators.required],
      criteria: ['', Validators.required],
      duration: ['', Validators.required]
    });

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

  // convenience getter for easy access to form fields
  get f() {
    return this.newChallengeForm.controls;
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/setup/fitbit']);
    } else {
      this.pullToRefresh();
    }
  }

  pullToRefresh(): void {
    this.loading = 0;
    this.loadingExpected = 3;

    this.submitted = false;
    this.submittingForm = false;

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

    this.apiService.getRpgNewChallenge().subscribe((data) => {
      const filteredValues = [];
      for (let i = 0; i < data['friends'].length; i++) {
        if (data['friends'][i]['you'] === 'friend') {
          filteredValues.push(data['friends'][i]['name'] + ' (' + data['friends'][i]['uuid'] + ')');
        }
      }

      this.searchChallengeFriends = this.formService.searchTemplate(
        filteredValues,
        this.challengeFriendsClick$,
        this.challengeFriendsFocus$
      );

      this.searchChallengeCriteria = this.formService.searchTemplate(
        data['criteria'],
        this.challengeCriteriaFocus$,
        this.challengeCriteriaClick$
      );

      this.searchChallengeDurations = this.formService.searchTemplate(
        data['durations'],
        this.challengeDurationsFocus$,
        this.challengeDurationsClick$
      );

      this.searchChallengeTargets = this.formService.searchTemplate(
        data['targets'],
        this.challengeTargetsFocus$,
        this.challengeTargetsClick$
      );

      this.loading++;
    });
  }

  // TODO: clear form in better way + clear tags field in chips-input-component
  onSubmitForm() {
    console.log('submitted');
    this.submitted = true;

    // stop here if form is invalid
    if (this.newChallengeForm.invalid) {
      return;
    }

    this.submittingForm = true;

    console.log(this.f.friend.value);
    console.log(this.f.target.value);
    console.log(this.f.criteria.value);
    console.log(this.f.duration.value);

    return;
  }
}

