import { Injectable } from '@angular/core';
import * as data from './data';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private appData: any;
  constructor(private http: HttpClient) {
    this.appData = { ...data };
  }

  private getAuthHeader() {
    return { headers: { Authorization: 'Basic fs-juniors' } };
  }

  getTeams() {
    return this.http.get(`${env.environment.apiUrl}/teams`, this.getAuthHeader());
  }

  saveTeams(teams: any) {
    console.log(teams);
    return this.http.post(`${env.environment.apiUrl}/teams`, teams, this.getAuthHeader());
  }


  private postData(data: any) {
    return this.http.post(`${env.environment.apiUrl}/storage`,
      data, this.getAuthHeader()
    );
  }

  get getData() {
    return this.http.get(`${env.environment.apiUrl}/data`, this.getAuthHeader());
  }

  saveData(incoming: any) {
    return this.postData(incoming);
  }

  loadTeams() {
    return this.saveTeams(data.appData.teams);
  }

  loadData() {
    return this.postData(data.appData.divisions);
  }

  getBracket() {
    return this.http.get(`${env.environment.apiUrl}/bracket`, this.getAuthHeader());
  }
}
