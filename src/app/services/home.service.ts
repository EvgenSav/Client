import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDevice } from '../models/Device';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'api/home';
  constructor(private http: HttpClient) { }
  getRooms = () => {
    return this.http.get<string[]>(this.baseUrl);
  };
}
