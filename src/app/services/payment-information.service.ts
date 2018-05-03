import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { PaymentInformation } from '../model/payment-information';


@Injectable()
export class PaymentInformationService {
    apiURL: string = process.env.API_URL;

    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) {}

    find(id: number): Observable<PaymentInformation[]> {
        return this.http.get(`${this.apiURL}/customers/payment-informations/${id}`, this.securityService.userJWTOptions())
            .map((res) => this.extractPaymentInformation(res));
    }

    create(payment: PaymentInformation): Observable<PaymentInformation[]> {
        return this.http.post(`${this.apiURL}/reservations/payment-information`, payment, this.securityService.userJWTOptions())
            .map((res) => this.extractPaymentInformation(res));
    }

    update(payment: PaymentInformation): Observable<PaymentInformation[]> {
        return this.http.put(`${this.apiURL}/customers/payment-informations`, payment, this.securityService.userJWTOptions())
            .map((res) => this.extractPaymentInformation(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.apiURL}/customers/payment-informations/${id}`, this.securityService.userJWTOptions());
    }

    fillWithCardNumber(payment: PaymentInformation) {
        return this.http.get(`${this.apiURL}/customers/payment-informations/${payment.id}/card-number`,
            this.securityService.userJWTOptions())
            .subscribe(res => {
                payment.cardNumber = res.json().data;
            });
    }

    private extractPaymentInformation(res: Response): PaymentInformation[] {
        let body = res.json();
        let response = body.data || [];
        return response;
    }
}
