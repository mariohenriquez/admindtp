import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { group, Injectable } from '@angular/core';
import { ParkingLot } from '../model/parking-lot';
import { SpotGroup } from '../model/spot-group';
import { Blackout } from '../model/blackout';
import { AvailabilityRule } from '../model/availability-rule';
import { File } from '../model/file';
import { SecurityService } from './security.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';
import { Pricing } from '../model/pricing';
// import 'rxjs/Rx';
import 'rxjs/add/operator/map'


@Injectable()
export class ParkingLotService {
    apiURL: string = process.env.API_URL;

    constructor(private http: Http, private securityService: SecurityService, private userService: UserService) { }

    find(id: number): Observable<ParkingLot[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/parking_lots/${id}`, this.securityService.userJWTOptions()).map((res) => this.extractLots(res))
    }

    findReservation(id: number): Observable<ParkingLot[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/parking_lots/${id}/reservations`, this.securityService.userJWTOptions()).map(this.extractReservation)
    }

    findParkingLotsForCurrentUser(): Observable<ParkingLot[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/my_parking_lots`, this.securityService.userJWTOptions()).map((res) => this.extractLots(res))
    }

    findAll(): Observable<ParkingLot[]> {
        return this.http.get(`${this.apiURL}${this.userService.urlRole()}/parking_lots`, this.securityService.userJWTOptions()).map((res) => this.extractLots(res))
    }

    update(parkingLot: ParkingLot): Observable<ParkingLot[]> {
        return this.http.put(`${this.apiURL}${this.userService.urlRole()}/parking_lots`, parkingLot, this.securityService.userJWTOptions()).map((res) => this.extractLots(res))
    }

    save(parkingLot: ParkingLot): Observable<ParkingLot[]> {
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/parking_lots`, parkingLot, this.securityService.userJWTOptions()).map((res) => this.extractLots(res))
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.apiURL}${this.userService.urlRole()}/parking_lots/${id}`, this.securityService.userJWTOptions())
    }

    loadUtilizationRate(id: number, from: any, to:any): Observable<Response> {
        let request = {
            parkingLotId: id,
            from: from,
            to: to
        }
        return this.http.post(`${this.apiURL}${this.userService.urlRole()}/overview/utilization`, request, this.securityService.userJWTOptions());
    }

    private extractReservation(res: Response) {
        let body = res.json();
        let data = body.data || [];
        return data;
    }

    private extractLots(res: Response) {
        let body = res.json();
        let data = body.data || [];
        return this.mapToParkingLots(data)
    }

    private mapToParkingLots(datum: any[]): ParkingLot[] {
        return datum.map(data => {
            data.spotGroups = this.mapToSpotGroups(data.spotGroups)
            data.blackouts = this.mapToBlackouts(data.blackouts)
            data.files = this.mapToFiles(data.files)
            data.pricing = this.mapToPricing(data.pricing)

            let parkingLot = new ParkingLot();
            Object.assign(parkingLot, data);
            return parkingLot;
        })
    }

    private mapToPricing(pricing: any): Pricing {
        if (pricing == null || pricing == undefined) return null;
        let pricingInstance = new Pricing();
        Object.assign(pricingInstance, pricing);
        return pricingInstance;
    }

    private mapToSpotGroups(spotGroups: any[]): SpotGroup[] {
        return spotGroups.map(group => {
            group.rules = this.mapToAvailabilityRules(group.rules)
            let groupInstance = new SpotGroup();
            Object.assign(groupInstance, group);
            return groupInstance;
        });
    }

    private mapToAvailabilityRules(rules: any[]): AvailabilityRule[] {
        if (rules == null) return null;
        return rules.map(rule => {
            rule.customDay = new Date(rule.customDay)
            rule.weekDays = rule.weekDays
            rule.weekDaysEnabled = (rule.weekDays != "")
            rule.customDayEnabled = !rule.weekDaysEnabled
            let ruleInstance = new AvailabilityRule();
            Object.assign(ruleInstance, rule);
            return ruleInstance;
        })
    }

    private mapToBlackouts(blackouts: any[]): Blackout[] {
        if (blackouts == null) return null;
        return blackouts.map(blackout => {
            blackout.fromDate = new Date(blackout.fromDate)
            blackout.toDate = new Date(blackout.toDate)
            delete blackout.holiday
            let blackoutInstance = new Blackout();
            Object.assign(blackoutInstance, blackout);
            return blackoutInstance;
        });
    }

    private mapToFiles(files: any[]): File[] {
        if (files == null) return null;
        files = files.map(f => {
            let file = new File();
            Object.assign(file, f);
            file.defineName(file.details.name);
            return file;
        });
        files.push(new File());
        return files;
    }
}
