import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IActionLogItem } from './models/ActionLogItem';
@Injectable({
  providedIn: 'root'
})
export class ActionLogService {
  constructor(private http: HttpClient) { }
  getActionLog = (devId: number) => this.http.get<IActionLogItem[]>(`api/ActionLog/${devId}`);
  getActionLogByDate = (devId: number, date: string) => this.http.get<IActionLogItem[]>(`api/ActionLog/${devId}/From${date ? '/' + date : ''}`);
}
