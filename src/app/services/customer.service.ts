import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { Customer } from '../model/customer';


@Injectable()
export class CustomerService {
    apiURL: string = process.env.API_URL;

    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) {}

    findAll(): Observable<Customer[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/customers`, this.securityService.userJWTOptions()).map(this.extraCustomer)
    }

    find(id: number): Observable<Customer[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/customers/${id}`, this.securityService.userJWTOptions()).map((res) => this.extraCustomer(res))
    }

    update(customer: Customer): Observable<Customer[]> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/customers`, customer, this.securityService.userJWTOptions()).map((res) => this.extraCustomer(res))
    }

    updateVehicle(customer: any): Observable<Customer[]> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/customers/vehicles`, customer, this.securityService.userJWTOptions()).map((res) => this.extraCustomer(res))
    }

    resetPassword(customer: any): Observable<Response> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/customers/reset/password`, customer, this.securityService.userJWTOptions())
    }

    deleteVehicle(id: number): Observable<Response> {
        return this.http.delete(`${this.apiURL}${this.userService.urlRole()}/customers/vehicles/${id}`, this.securityService.userJWTOptions())
    }

    loadMovements(): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/customers/movements`, this.securityService.userJWTOptions())
    }
    
    addVehicle(vehicle: any): Observable<Response> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/customers/vehicles`, vehicle, this.securityService.userJWTOptions())
    }
    
    loadVehicles(): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/customers/vehicles`, this.securityService.userJWTOptions())
    }
    
    private extraCustomer(res: Response) {
        let body = res.json();
        let data = body.data || [];
        return data;
    }
}