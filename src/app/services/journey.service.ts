import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {
  private myAppUrl = 'https://localhost:7004/';
  private myApiUrl = 'api/journey/';

  constructor( private http: HttpClient) { }

  getTravels(origin: string, destination: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + origin + "/" + destination);
  }
}
