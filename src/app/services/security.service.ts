import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SecurityService {
    apiURL : string = process.env.API_URL;
    presharedToken : string = process.env.API_PRESHARED_TOKEN;

    constructor(private http: Http) {}

    buildClientJWT() : Observable<Response> {
        let headers = new Headers({ 'Client-Token': this.presharedToken });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.apiURL}/auth`, {}, options)
    }

    userJWTOptions() : RequestOptions {
        let requestOptions : RequestOptions = new RequestOptions()
        let userJWT : string = localStorage.getItem("UserJWT")

        requestOptions.headers = new Headers({
            "Authorization": `Bearer ${userJWT}`,
        })
        return requestOptions
    }
}
