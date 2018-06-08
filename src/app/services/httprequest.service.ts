import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TestCase } from '../interfaces/TestCase';

@Injectable()
export class HTTPrequestService {

      ///////////////////////////////////////////
     // REPLACE THIS BY YOUR BACKEND ENDPOINT //
    ///////////////////////////////////////////
    private requestUrl: string = "http://localhost:8080/problems/candychain";

	public constructor(private http: Http) { }

    public newRequest(t:TestCase){
        let headers = new Headers(
            { 
                'Accept': 'application/json'
            });
        let options = new RequestOptions({ headers: headers });
        return this.http.post( this.requestUrl , t ,options).map((res:Response) => res.json());
    }


}
