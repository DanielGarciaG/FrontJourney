import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {
  private myAppUrl = 'https://localhost:7004/';
  private myApiUrl = 'api/journey/';
  private appConvertCurrency = 'https://open.er-api.com/v6/latest/USD?apikey=';
  private apiKey = '3F2504E0-4F89-11D3-9A0C-0305E82C3301';

  constructor( private http: HttpClient) { }

  getTravels(origin: string, destination: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + origin + "/" + destination);
  }

  convertCurrency(): Observable<any> {
    return this.http.get(this.appConvertCurrency + this.apiKey);
  }
}
