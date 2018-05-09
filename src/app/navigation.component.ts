import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'navigation',
  template: require('./navigation.component.html')
})
export class NavigationComponent {
  displayMenu: boolean;
  showNewLotBtn: boolean;
  showNewPSOBtn: boolean;
  showNewCouponBtn: boolean;
  showNavbar: string = '';
  inventoryNavbar: boolean;
  manageUsersNavbar: boolean;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    router.events.subscribe( (event) => {
      if( event instanceof NavigationEnd) {
        this.showNewLotBtn = (this.router.url == "/inventory/parking-lots");
        this.showNewPSOBtn = (this.router.url == "/inventory/psos");
        this.showNewCouponBtn = (this.router.url == "/inventory/coupons");
      }
      this.showNavbar = this.router.url.split('/',2)[1];
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
    return false;
  }

}
