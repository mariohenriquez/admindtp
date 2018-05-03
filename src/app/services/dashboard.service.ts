import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';


@Injectable()
export class DashboardService {
    apiURL: string = process.env.API_URL;

    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) {}

    loadOverall(startDate, endDate, type): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/overview/overall?from=${startDate}&to=${endDate}&type=${type}`, this.securityService.userJWTOptions())
    }

    loadReservations(startDate, endDate, type): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/overview/reservations?from=${startDate}&to=${endDate}&type=${type}`, this.securityService.userJWTOptions())
    }

    loadReservationsRevenue(): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/overview/reservations/revenue`, this.securityService.userJWTOptions())
    }

    loadFinancial(startDate, endDate, type): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/overview/financial?from=${startDate}&to=${endDate}&type=${type}`, this.securityService.userJWTOptions())
    }

    loadMovements(startDate, endDate, limit): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/overview/movements?from=${startDate}&to=${endDate}&limit=${limit}`, this.securityService.userJWTOptions())
    }
}