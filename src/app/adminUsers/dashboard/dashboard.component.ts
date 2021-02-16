import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toggledSideBar: boolean=false
  constructor() { }

  ngOnInit() {
  }
  public openSideBar(event?:Event) {
    event.preventDefault();
     this.toggledSideBar = !this.toggledSideBar
  };
}
