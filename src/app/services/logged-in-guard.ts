import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    let jwt = localStorage.getItem("UserJWT")
    if( jwt == undefined ){
      this.router.navigate(["/login"])
      return false
    }

    return true
  }
}
