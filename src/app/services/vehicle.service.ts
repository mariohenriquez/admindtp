import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';


@Injectable()
export class VehicleService {
    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) {}

    getAllMakers(): Observable<Response> {
        return this.http.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json');
    }

    getModelsFor(maker: string): Observable<Response> {
        let encodedMaker = encodeURI(maker.toLowerCase());
        return this.http.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodedMaker}?format=json`);
    }
}
