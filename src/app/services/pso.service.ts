import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { PSO } from '../model/pso';
import { Observable } from 'rxjs/Rx';
import { SecurityService } from './security.service';
import { UserService } from './user.service';
import { File } from '../model/file';
import { Contact } from '../model/contact';
import { ParkingLot } from '../model/parking-lot';

@Injectable()
export class PSOService {

    apiURL: string = process.env.API_URL;
    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) { }

    findAll(): Observable<PSO[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/pso`, this.securityService.userJWTOptions()).map(this.extractPSOs)
    }

    save(pso: PSO): Observable<PSO[]> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/pso`, pso, this.securityService.userJWTOptions()).map(this.extractPSOs)
    }

    update(pso: PSO): Observable<PSO[]> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/pso`, pso, this.securityService.userJWTOptions()).map(this.extractPSOs)
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.apiURL}${this.userService.urlRole()}/pso/${id}`, this.securityService.userJWTOptions());
    }

    find(id: number): Observable<PSO[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/pso/${id}`, this.securityService.userJWTOptions()).map(this.extractPSOs)
    }

    advertisementImg(id: number): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/pso/${id}/advertisement-file`, this.securityService.userJWTOptions())
    }

    findReservations(id: number): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/pso/${id}/reservations`, this.securityService.userJWTOptions())
    }

    findEmployeesMovements(id: number): Observable<Response> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/pso/${id}/employees`, this.securityService.userJWTOptions())
    }

    files(id: number) {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/pso/${id}/files`, this.securityService.userJWTOptions());
    } 

    private extractPSOs(res: Response): PSO[] {
        let body = res.json();
        let data: PSO[] = [];
        let response = body.data || [];

        response.forEach(datum => {
            let pso: PSO = new PSO();
            Object.assign(pso, datum);
            pso.files = [];
            pso.contacts = [];
            pso.parkingLots = [];

            if (datum.parkingLots != null) {
                datum.parkingLots.forEach(pl => {
                    let parkingLot = new ParkingLot()
                    Object.assign(parkingLot, pl);
                    pso.parkingLots.push(parkingLot)
                })
            }

            if (datum.files != null) {
                datum.files.forEach(f => {
                    let file = new File();
                    Object.assign(file, f);
                    file.defineName(file.details.name)
                    pso.files.push(file);
                })
            }

            if (datum.contacts != null) {
                datum.contacts.forEach(c => {
                    let contact = new Contact()
                    Object.assign(contact, c);
                    pso.contacts.push(contact)
                })
            }

            if (pso.contacts.length == 0) {
                pso.contacts.push(new Contact())
            }

            data.push(pso);
        })

        return data
    }
}
