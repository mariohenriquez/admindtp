import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { Coupon } from '../model/coupon';


@Injectable()
export class CouponService {
    apiURL: string = process.env.API_URL;

    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) {}

    find(id: number): Observable<Coupon[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/coupons/${id}`, this.securityService.userJWTOptions()).map((res) => this.extraCoupons(res))
    }

    findAll(): Observable<Coupon[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/coupons`, this.securityService.userJWTOptions()).map(this.extraCoupons)
    }

    save(coupon: Coupon): Observable<Coupon[]> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/coupons`, coupon, this.securityService.userJWTOptions()).map((res) => this.extraCoupons(res))
    }

    update(coupon: Coupon): Observable<Coupon[]> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/coupons`, coupon, this.securityService.userJWTOptions()).map((res) => this.extraCoupons(res))
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.apiURL}${this.userService.urlRole()}/coupons/${id}`, this.securityService.userJWTOptions())
    }

    private extraCoupons(res: Response) {
        let body = res.json();
        let data = body.Data || [];
        return data;
    }
}
