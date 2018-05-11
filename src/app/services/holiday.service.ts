import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SecurityService } from './security.service';
import { File } from '../model/file';
import { Contact } from '../model/contact';
import { ParkingLot } from '../model/parking-lot';
import { environment } from '../../environments/environment';

@Injectable()
export class HolidayService {

    apiURL: string = environment.SERVICE_URL;
    _holidays: string[] = [
        "Christmas Day",
        "Christmas Eve",
        "Columbus Day",
        "Easter",
        "Independence Day",
        "Labor Day",
        "Martin Luther King Day",
        "Memorial Day",
        "New Year's Day",
        "Presidential Election",
        "Presidents Day",
        "Thanksgiving After Day",
        "Thanksgiving Day",
        "Veterans Day"
    ];

    constructor(private http: Http, private securityService: SecurityService) {}

    all(): string[] {
        return this._holidays
    }

    findAll(): Observable<string[]> {
        return this.http.get(`${this.apiURL}/holidays`, this.securityService.userJWTOptions()).map(this.extractHolidays)
    }

    private extractHolidays(res: Response): string[] {
        let body = res.json();
        let response = body.data || [];
        return response
    }
}