import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  uiSettings: { showNavBar: string|boolean, showAsideBar: string|boolean };
  constructor() {}
}
