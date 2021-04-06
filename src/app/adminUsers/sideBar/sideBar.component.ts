import { environment } from './../../../environments/environment';

import { AuthService } from './../../login/auth.service';
import { expandableMenu } from './../../shared/services/alert-animation';
import { Component } from '@angular/core';

@Component({
  selector: 'app-SideBar',
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.css'],
  animations: [expandableMenu],
})
export class SideBarComponent {


  toggledSideBar: boolean = false;
  expandableMenuVolunters = false;
  expandableMenuMissionaries = false;
  expandableMenuPartners = false;
  expandableMenuAdminUsers = false;
  ambiente: any;


  public toggleVolunters() {
    this.expandableMenuVolunters = !this.expandableMenuVolunters;
  }
  public toggleMissionaries() {
    this.expandableMenuMissionaries = !this.expandableMenuMissionaries;
  }
  public togglePartners() {
    this.expandableMenuPartners = !this.expandableMenuPartners;
  }
  public toggleAdminUsers() {
    this.expandableMenuAdminUsers = !this.expandableMenuAdminUsers;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  this.ambiente = environment.AMBIENTE




  }

  // side bar

  public openSideBar(event?: Event) {
    event.preventDefault();
    this.toggledSideBar = !this.toggledSideBar;
  }

  closeLists(){
  this.expandableMenuVolunters = false;
  this.expandableMenuMissionaries = false;
  this.expandableMenuPartners = false;
  this.expandableMenuAdminUsers = false;
  this.toggledSideBar = true
  }


}
