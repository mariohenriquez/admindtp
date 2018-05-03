// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Rx';
import { User } from '../model/user';

var jwtDecode = require('jwt-decode');

@Injectable()
export class UserService {

  private loggedIn = false;
  private apiURL: string = process.env.API_URL;

  constructor(private http: Http, private securityService: SecurityService) {
    this.loggedIn = !!localStorage.getItem('UserJWT');
  }
  
  profile(): any {
    return jwtDecode(localStorage.getItem("UserJWT"));
  }

  username(): string {
    return jwtDecode(localStorage.getItem("UserJWT")).name;
  }

  id(): string {
    return jwtDecode(localStorage.getItem("UserJWT")).id;
  }

  lastname(): string {
    return jwtDecode(localStorage.getItem("UserJWT")).lastname;
  }

  email(): string {
    return jwtDecode(localStorage.getItem("UserJWT")).email;
  }

  parkingLots(): any[] {
    return jwtDecode(localStorage.getItem("UserJWT")).parkingLots;
  }

  phoneNumber(): string {
    return jwtDecode(localStorage.getItem("UserJWT")).phoneNumber;
  }

  role(): string {
    let userJWT = localStorage.getItem("UserJWT");
    return (userJWT !== null && userJWT !== undefined) ? jwtDecode(localStorage.getItem("UserJWT")).role : '';
  }

  labelRole(): string {
    let role = this.role();
    if (role === 'AUTHENTICATED_SECRET') {
      return 'Admin';
    } else if (role === 'PLM_SECRET') {
      return 'Parking Lot Monitor';
    } else if (role === 'TTD_SECRET') {
      return 'Tow Truck Driver';
    } else if (role === 'CS_SECRET') {
      return 'Customer Support';
    } else if (role === 'MANAGER_SECRET') {
      return 'Manager';
    }
  }

  labelRoleFor(role: string): string {
    if (role === 'AUTHENTICATED_SECRET') {
      return 'Admin';
    } else if (role === 'PLM_SECRET') {
      return 'PLM(Parking Lot Monitor)';
    } else if (role === 'TTD_SECRET') {
      return 'TTD(Tow Truck Driver)';
    } else if (role === 'CS_SECRET') {
      return 'CS(Customer Support)';
    } else if (role === 'MANAGER_SECRET') {
      return 'M(Manager)';
    }
  }

  acronymRoleFor(role: string): string {
    if (role === 'AUTHENTICATED_SECRET') {
      return 'ADM';
    } else if (role === 'PLM_SECRET') {
      return 'PLM';
    } else if (role === 'TTD_SECRET') {
      return 'TTD';
    } else if (role === 'CS_SECRET') {
      return 'CS';
    } else if (role === 'MANAGER_SECRET') {
      return 'M';
    }
  }

  urlRole(): string {
    let role = this.role();
    switch (role) {
      case 'PLM_SECRET': return '/plm';
      case 'TTD_SECRET': return '/ttd';
      case 'CS_SECRET': return '/cs';
      case 'MANAGER_SECRET': return '/m';
      default: return '';
    }
  }

  vehicles(): any[] {
    return
  }

  login(email: string, password: string): Observable<Response> {
    let headers = new Headers();

    let clientToken = localStorage.getItem("ClientJWT")
    headers.append('Authorization', `Bearer ${clientToken}`);
    headers.append('Content-Type', `application/json`);

    return this.http.post(`${this.apiURL}/login`, { username: email, password: password }, { headers: headers })
  }

  logout() {
    localStorage.removeItem('UserJWT');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  refresh(callback?: any) {
    this.http.get(`${this.apiURL}${this.urlRole()}/users/refresh`, this.securityService.userJWTOptions()).
      subscribe(res => {
        localStorage.setItem('UserJWT', res.json()['data']);
        if (callback) {
          callback();
        }
      });
  }

  invitate(newMember: any): Observable<Response> {
    return this.http.post(`${this.apiURL}/users/invitate`, newMember, this.securityService.userJWTOptions());
  }

  create(newMember: any): Observable<Response> {
    let headers = new Headers({ 'Client-Token': process.env.API_PRESHARED_TOKEN });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.apiURL}${this.urlRole()}/users`, newMember, options);
  }

  update(user: User): Observable<User[]> {
      return this.http.put(`${this.apiURL}${this.urlRole()}/users`, user, this.securityService.userJWTOptions()).map((res) => this.extraUser(res))
  }

  updateMember(user: any): Observable<Response> {
      return this.http.put(`${this.apiURL}${this.urlRole()}/users/member`, user, this.securityService.userJWTOptions())
  }

  resetPassword(user: any): Observable<Response> {
    return this.http.post(`${this.apiURL}${this.urlRole()}/users/reset/password`, user, this.securityService.userJWTOptions())
  }

  validateResetPasswordRequest(uuid:string): Observable<Response> {
    return this.http.get(`${this.apiURL}${this.urlRole()}/users/reset/password/${uuid}`, this.securityService.userJWTOptions())
  }

  validateInvitationRequest(uuid:string): Observable<Response> {
    return this.http.get(`${this.apiURL}${this.urlRole()}/users/invitate/${uuid}`, this.securityService.userJWTOptions())
  }

  findAll(): Observable<Response> {
      return this.http.get(`${this.apiURL}${this.urlRole()}/users`, this.securityService.userJWTOptions())
  }

  find(id: any): Observable<Response> {
      return this.http.get(`${this.apiURL}${this.urlRole()}/users/${id}`, this.securityService.userJWTOptions())
  }

  delete(id: any): Observable<Response> {
      return this.http.delete(`${this.apiURL}${this.urlRole()}/users/${id}`, this.securityService.userJWTOptions())
  }

  updatePassword(user: User): Observable<Response> {
      return this.http.put(`${this.apiURL}${this.urlRole()}/users/password`, user, this.securityService.userJWTOptions());
  }

  updatePasswordWithUUID(uuid: string, user: any): Observable<Response> {
    return this.http.put(`${this.apiURL}${this.urlRole()}/users/password/${uuid}`, user, this.securityService.userJWTOptions());
  }

  private extraUser(res: Response) {
      let body = res.json();
      let data = body.data || [];
      return data;
  }
}
