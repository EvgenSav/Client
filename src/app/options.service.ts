import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  baseUrl: string = 'api/options';
  constructor(private http: HttpClient) {
    http.get(this.baseUrl)
  }
  getGeneralOptions = () => {
    return this.http.get(`${this.baseUrl}/general`);
  }
}
