import { Injectable } from '@angular/core';
import { IRequest } from './models/Request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'api/request';
  getRequests = () => this.httpClient.get<IRequest[]>(this.baseUrl);
  patchRequest = (id: any, patch: any) => this.httpClient.patch<IRequest>(`${this.baseUrl}/${id}`, [patch]);
  addNewRequest = (request: IRequest) => this.httpClient.post<IRequest>(this.baseUrl, request);
  executeRequest = (id: string) => this.httpClient.get(`${this.baseUrl}/ExecuteRequest/${id}`);
  deleteRequest = (id: string) => this.httpClient.delete(`${this.baseUrl}/${id}`)
}
