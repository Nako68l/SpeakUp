import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-popup',
  templateUrl: './basic-popup.component.html',
  styleUrls: ['./basic-popup.component.scss']
})
export class BasicPopupComponent implements OnInit {

  showPopup: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.showPopup = !this.showPopup
  }

}
