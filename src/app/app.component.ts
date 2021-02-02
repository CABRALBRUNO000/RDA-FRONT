import { EventEmitter } from 'events';
import { AuthService } from './login/auth.service';
import { expandableMenu } from './services/alert-animation';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [expandableMenu],
})
export class AppComponent {
  showMenu:boolean = false

  toggledSideBar: boolean = false;
  expandableMenuVolunters = false;
  expandableMenuMissionaries = false;
  expandableMenuPartners = false;
  expandableMenuAdminUsers = false;

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
    this.authService.getEmitterMenu().subscribe(
     ( show) => this.showMenu = show
    )




  }

  // side bar

  public openSideBar(event?: Event) {
    event.preventDefault();
    this.toggledSideBar = !this.toggledSideBar;
  }
}
