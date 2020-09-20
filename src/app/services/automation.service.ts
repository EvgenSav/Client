import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patch } from '../patch-helper';
import { IAutomation } from '../models/Automation';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {
  private baseUrl = 'api/automation';
  constructor(private http: HttpClient) { }
  getAutomationList = () => {
    return this.http.get<IAutomation[]>(this.baseUrl);
  };
  getAutomation = (automationId: string) => {
    return this.http.get<IAutomation>(`${this.baseUrl}/${automationId}`);
  };
  patchAutomation = (automationId: string, patch: Patch) => {
    return this.http.patch<IAutomation>(`${this.baseUrl}/${automationId}`, patch);
  }
}
