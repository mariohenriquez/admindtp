import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { Reservation } from '../model/reservation';


@Injectable()
export class ReservationService {
    apiURL: string = process.env.API_URL;

    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) {}

    find(id: number): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/reservations/${id}`, this.securityService.userJWTOptions()).map(this.extractReservations);
    }

    create(reservation: Reservation): Observable<Response> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/reservations`, reservation, this.securityService.userJWTOptions());
    }

    update(reservation: Reservation): Observable<Response> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/reservations`, reservation, this.securityService.userJWTOptions());
    }

    updateVehicleToUse(reservationID: number, vehicleID: number): Observable<Response> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/reservations/vehicles/${reservationID}/${vehicleID}`, null, this.securityService.userJWTOptions());
    }

    availability(availabillity: any, id: number): Observable<Response> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/reservations/availability?id:${id}`, availabillity, this.securityService.userJWTOptions());
    }

    calcPrice(availabillity: any): Observable<Response> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/reservations/price`, availabillity, this.securityService.userJWTOptions());
    }

    findReservationByPSO(id: number): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/pso/${id}/reservations`, this.securityService.userJWTOptions()).map(this.extractReservations);
    }
    
    recurringPayment(id: number, paymentMethod: string, amountPrice: number): Observable<Response> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/reservations/repay/${id}?adjust=${paymentMethod}&price=${amountPrice}`, null, this.securityService.userJWTOptions());
    }

    findPaymentInformation(id: number): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/reservations/payment-informations/${id}`, this.securityService.userJWTOptions()).map(this.extractReservations);
    }
    
    updatePaymentInformationForCustomer(id: number, payment_id: number): Observable<Response> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/reservations/payment-informations/${id}/${payment_id}`, null, this.securityService.userJWTOptions());
    }

    validateCoupon(code: string, type: string, parkingLotID: number): Observable<Response> {
        return this.http.get(`${this.apiURL}/coupons/find/${code}/${type}/${parkingLotID}`, this.securityService.userJWTOptions());
    }

    private extractReservations(res: Response) {
        let body = res.json();
        let response = body.data || [];
        return response;
    }
}
