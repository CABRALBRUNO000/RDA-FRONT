import { Component, OnInit, Injectable, Input } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],

})
@Injectable()
export class MainComponent implements OnInit {


  toggledSideBar: boolean=false

  constructor(

  ) {}

  ngOnInit(): void {


  }



  // side bar

  public openSideBar(event?:Event) {
      event.preventDefault();
       this.toggledSideBar = !this.toggledSideBar
    };

}
