import { replaceVarInExpression } from '@angular/compiler/src/output/output_ast';
import { SecurityService } from './services/security.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

var jwtDecode = require('jwt-decode');

@Component({
  selector: 'login',
  template: require('./login.component.html'),
})
export class LoginComponent {

  public loginEnabled : boolean = false
  private alertMessage: string = ""

  constructor(private userService: UserService, private router: Router, private securityService: SecurityService) {
    var body = document.getElementsByTagName('body')[0]
    body.classList.add("login");

    securityService.buildClientJWT().subscribe(res => {
      if( res.status == 200 ){
        localStorage.setItem('ClientJWT', res.json()["token"])
        this.loginEnabled = true
      }
    })
  }

  onSubmit(email: string, password: string) {
    this.loginEnabled = false

    this.userService.login(email, password).subscribe( res => {
      this.loginEnabled = true

      if (res) {
        localStorage.setItem("UserJWT",res.json()["token"])
        this.alertMessage = "";
        let role = this.userService.acronymRoleFor(this.userService.role());
        (role === 'CS') ? this.router.navigate(['manage-users/customers']) : this.router.navigate(['']);
      }
    },error => {
      this.alertMessage = "Invalid username/password";
      this.loginEnabled = true;
    });
  }
}
