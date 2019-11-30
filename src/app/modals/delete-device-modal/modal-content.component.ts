import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})

export class DeleteDeviceConfirmationComponent implements OnInit {
  title: string;
  closeBtnName: string = 'Close';
  primaryBtnName?: string;
  list: any[] = [];  
  onPrimaryClicked?: () => void;
  onPrimaryClick = () => {
    if(this.onPrimaryClicked != null) {
      this.onPrimaryClicked();
    }
    this.bsModalRef.hide(); 
  }
  constructor(public bsModalRef: BsModalRef) {} 
  ngOnInit() {

  }
}
