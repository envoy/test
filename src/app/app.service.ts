import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Location } from './models/location';
import { Group } from './models/group';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  url = '/api';
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(this.url + '/groups');
  }

  getLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.url + '/locations');
  }
}