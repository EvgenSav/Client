import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  getWindowRef() {
    return window;
  }
}
