import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { Report } from '../model/report';
import { Observable } from 'rxjs/Rx';
import { SecurityService } from './security.service';
import { File } from '../model/file';
import { Contact } from '../model/contact';
import { ParkingLot } from '../model/parking-lot';
import { UserService } from './user.service';

@Injectable()
export class ReportService {

    apiURL: string = process.env.API_URL;
    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) { }

    findAll(): Observable<Report[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/reports`, this.securityService.userJWTOptions()).map(this.extractReports)
    }

    save(report: Report): Observable<Response> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/reports`, report, this.securityService.userJWTOptions())
    }

    update(report: Report): Observable<Response> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/reports`, report, this.securityService.userJWTOptions())
    }

    find(id: number): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/reports/${id}`, this.securityService.userJWTOptions())
    }

    private extractReports(res: Response): Report[] {
        let body = res.json();
        let data: Report[] = [];
        let response = body.data || [];
        data = response.map(r => {
            let report = new Report();
            Object.assign(report, r);
            return report;
        });

        return data;
    }

}
