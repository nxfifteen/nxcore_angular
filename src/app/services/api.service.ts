import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
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

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public getProfile(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/${this.currentUser.username}/ux/profile?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getFitDashboard(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/${this.currentUser.username}/ux/feed/dashboard?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getFitBodyWeight(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/body/weight/186?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getProfileValues(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/users/profile?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, true);
  }

  public saveProfileValues(firstName, lastName, dateOfBirth, email, avatar) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users/profile/save?key=${this.currentUser.token}`, {firstName, lastName, dateOfBirth, email, avatar}
    ).pipe(map(user => {
      console.log(user);
    }));
  }

  public getRpgPve(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/pve/challenges/all?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgPveIn(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/pve/challenges?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }


  public getSiteNews(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/api/site_news?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getAchievementsAwards(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/achievements/awards?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getAchievementsAwardDetails(badgeId: number, bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/achievements/awards/${badgeId}?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgFriends(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/pvp/leaderboard?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgNewChallenge(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/forms/challenges/new?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getDashboard(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/dashboard?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgPvp(bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/pvp/challenges?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getRpgPvpDetails(badgeId: number | string, bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/pvp/challenges/${badgeId}?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getActivitiesLog(bustCache?: boolean, fromDate?: string, searchRange?: string) {
    if (typeof fromDate === 'undefined') {
      fromDate = '';
    }
    if (typeof searchRange === 'undefined') {
      searchRange = '';
    }
    const URL = `${environment.apiUrl}/feed/activities/log${fromDate}${searchRange}?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public getActivitiesLogDetails(badgeId: number | string, bustCache?: boolean) {
    const URL = `${environment.apiUrl}/feed/activities/detail/${badgeId}?key=${this.currentUser.token}`;
    return this.makeHttpGetRequest(URL, bustCache);
  }

  public submitNewPVPChallenge(friend, target, criteria, duration) {
    const URL = ``;
    return this.httpClient.post<any>(
      `${environment.apiUrl}/submit/pvp/challenge?key=${this.currentUser.token}`, {friend, target, criteria, duration}
    ).pipe(map(user => {
      console.log(user);
    }));
  }

  private makeHttpGetRequest(URL: string, bustCache?: boolean): Observable<any> {
    if (!bustCache) {
      const apiFromCache = this.responseCache.get(URL);
      if (apiFromCache) {
        if (!environment.production) {
          console.log(URL + ' : Returned from cache');
        }
        return of(apiFromCache);
      }
    } else {
      console.log(URL + ' : Cache Busted');
    }
    if (!bustCache && !environment.production) {
      console.log(URL + ' : Returned from source');
    }
    const response = this.httpClient.get<any>(URL);
    response.subscribe(data => this.responseCache.set(URL, data));

    return response;
  }
}
