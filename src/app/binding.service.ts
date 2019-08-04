import { Injectable } from '@angular/core';
import { IBindRequest } from './models/BindRequest';
import { HttpClient } from '@angular/common/http';
import { Patch } from './patch-helper';

@Injectable({
  providedIn: 'root'
})
export class BindingService {
  constructor(private hhtpClient: HttpClient) { }
  private baseUrl = 'api/binding';
  getBindRequests = () => this.hhtpClient.get<IBindRequest[]>(this.baseUrl);
  pathBindingRequest = (id: any, patch: any) => this.hhtpClient.patch<IBindRequest>(`${this.baseUrl}/${id}`, [patch]);
  addNewBindRequests = (bindRequest: IBindRequest) => this.hhtpClient.post<IBindRequest>(this.baseUrl, bindRequest);
}
