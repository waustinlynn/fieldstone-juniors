import { Injectable } from '@angular/core';
import * as data from './data';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';

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


  private postData(data: any) {
    return this.http.post(`${env.environment.apiUrl}/storage`,
      data, this.getAuthHeader()
    );
  }

  get getData() {
    return this.http.get(`${env.environment.apiUrl}/storage/get/fs-jrs/data`, this.getAuthHeader());
  }

  saveData(incoming: any) {
    return this.postData(incoming);
  }

  loadFresh() {
    let seedData = data.appData;
    return this.postData(seedData);
  }
}
