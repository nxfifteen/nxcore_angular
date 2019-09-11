import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = 'Ze3t6noklu9Vozikrw';
  constructor(private httpClient: HttpClient) { }

  public getProfile() {
    return this.httpClient.get(`https://connect.core.nxfifteen.me.uk/269VLG/ux/profile?key=${this.API_KEY}`);
  }

  public getFitDashboard() {
    return this.httpClient.get(`https://connect.core.nxfifteen.me.uk/269VLG/ux/feed/dashboard?key=${this.API_KEY}`);
  }
}
