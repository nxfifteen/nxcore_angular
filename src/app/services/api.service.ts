import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../_services';
import {User} from '../_models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  currentUser: User;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public getProfile() {
    if (!environment.production) {
      console.log(`${environment.apiUrl}/${this.currentUser.username}/ux/profile?key=${this.currentUser.token}`);
    }
    return this.httpClient.get(`${environment.apiUrl}/${this.currentUser.username}/ux/profile?key=${this.currentUser.token}`);
  }

  public getFitDashboard() {
    if (!environment.production) {
      console.log(`${environment.apiUrl}/${this.currentUser.username}/ux/feed/dashboard?key=${this.currentUser.token}`);
    }
    return this.httpClient.get(`${environment.apiUrl}/${this.currentUser.username}/ux/feed/dashboard?key=${this.currentUser.token}`);
  }

  public getFitBodyWeight() {
    if (!environment.production) {
      console.log(`${environment.apiUrl}/${this.currentUser.username}/ux/feed/body/weight/186?key=${this.currentUser.token}`);
    }
    return this.httpClient.get(`${environment.apiUrl}/${this.currentUser.username}/ux/feed/body/weight/186?key=${this.currentUser.token}`);
  }

  public getProfileValues() {
    if (!environment.production) {
      console.log(`${environment.apiUrl}/users/profile?key=${this.currentUser.token}`);
    }
    return this.httpClient.get(`${environment.apiUrl}/users/profile?key=${this.currentUser.token}`);
  }

  public saveProfileValues(firstName, lastName, dateOfBirth, email, avatar) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/users/profile/save?key=${this.currentUser.token}`, {firstName, lastName, dateOfBirth, email, avatar}
    ).pipe(map(user => {
      console.log(user);
    }));
  }



  public getRpgFriends() {
    if (!environment.production) {
      console.log(`${environment.apiUrl}/feed/pvp/leaderboard?key=${this.currentUser.token}`);
    }
    return this.httpClient.get(`${environment.apiUrl}/feed/pvp/leaderboard?key=${this.currentUser.token}`);
  }

  public getDashboard() {
    if (!environment.production) {
      console.log(`${environment.apiUrl}/feed/dashboard?key=${this.currentUser.token}`);
    }
    return this.httpClient.get(`${environment.apiUrl}/feed/dashboard?key=${this.currentUser.token}`);
  }

  public getRpgPvp() {
    if (!environment.production) {
      console.log(`${environment.apiUrl}/feed/pvp/challenges?key=${this.currentUser.token}`);
    }
    return this.httpClient.get(`${environment.apiUrl}/feed/pvp/challenges?key=${this.currentUser.token}`);
  }
}
