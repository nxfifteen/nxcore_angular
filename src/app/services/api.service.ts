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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {AuthenticationService} from '../_services';
import {User} from '../_models';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  currentUser: User;
  public responseCache = new Map();
  private readonly apiUrl: string;
  private readonly isProduction: boolean;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService,
              private environment: ConfigService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.apiUrl = environment.app.apiUrl;
    this.isProduction = environment.app.production;
  }

  public getProfile(bustCache?: boolean) {
    const URL = `${this.apiUrl}/${this.currentUser.username}/ux/profile?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getFitDashboard(bustCache?: boolean) {
    const URL = `${this.apiUrl}/${this.currentUser.username}/ux/feed/dashboard?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getFitBodyWeight(bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/body/weight/186?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getProfileValues(bustCache?: boolean) {
    const URL = `${this.apiUrl}/users/profile?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public saveProfileValues(firstName, lastName, dateOfBirth, email, avatar) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/users/profile/save?key=${this.currentUser.token}`, {firstName, lastName, dateOfBirth, email, avatar}
    ).pipe(map(user => {
      console.log(user);
    }));
  }

  public getRpgPve(bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/pve/challenges/all?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgPveIn(bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/pve/challenges?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }


  public getSiteNews(bustCache?: boolean) {
    const URL = `${this.apiUrl}/news/site?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getPersonalNews(bustCache?: boolean) {
    const URL = `${this.apiUrl}/news/personal?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getPushNews(bustCache?: boolean) {
    const URL = `${this.apiUrl}/news/push?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getExercisesOverview(bustCache?: boolean) {
    const URL = `${this.apiUrl}/json/exercises/overview?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getExercisesCategoryOverview(bustCache?: boolean) {
    const URL = `${this.apiUrl}/json/exercises/category/overview?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getExercisesEquipmentOverview(bustCache?: boolean) {
    const URL = `${this.apiUrl}/json/exercises/equipment/overview?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getExercisesMuscleOverview(bustCache?: boolean) {
    const URL = `${this.apiUrl}/json/exercises/muscle/overview?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getAchievementsAwards(bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/achievements/awards?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getAchievementsAwardDetails(badgeId: number, bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/achievements/awards/${badgeId}?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgFriends(bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/pvp/leaderboard?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgNewChallenge(bustCache?: boolean) {
    const URL = `${this.apiUrl}/forms/challenges/new?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getDashboard(bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/dashboard?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgPvp(bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/pvp/challenges?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgPvpDetails(badgeId: number | string, bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/pvp/challenges/${badgeId}?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getActivitiesLog(bustCache?: boolean, fromDate?: string, searchRange?: string) {
    if (typeof fromDate === 'undefined') {
      fromDate = '';
    }
    if (typeof searchRange === 'undefined') {
      searchRange = '';
    }
    const URL = `${this.apiUrl}/feed/activities/log${fromDate}${searchRange}?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getActivitiesLogDetails(badgeId: number | string, bustCache?: boolean) {
    const URL = `${this.apiUrl}/feed/activities/detail/${badgeId}?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public submitNewPVPChallenge(friend, target, criteria, duration) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/submit/pvp/challenge?key=${this.currentUser.token}`, {friend, target, criteria, duration}
    ).pipe(map(user => {
      console.log(user);
    }));
  }

  public siteNewsDisplayed(toastId: number, message: string) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/news/push/seen?key=${this.currentUser.token}`, {toastId, message}
    );
  }

  private makeHttpGetRequest(URL: string, bustCache?: boolean): Observable<any> {
    if (!bustCache) {
      const apiFromCache = this.responseCache.get(URL);
      if (apiFromCache) {
        if (!this.isProduction) {
          console.log(URL + ' : Returned from cache');
        }
        return of(apiFromCache);
      }
    } else {
      if (!this.isProduction) {
        console.log(URL + ' : Cache Busted');
      }
    }
    if (!bustCache && !this.isProduction) {
      console.log(URL + ' : Returned from source');
    }
    const response = this.httpClient.get<any>(URL);
    response.subscribe(data => this.responseCache.set(URL, data));

    return response;
  }
}
