import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {
  private myAppUrl = environment.myAppUrl;
  private myApiUrl = environment.myApiUrl;
  private appConvertCurrency = environment.appConvertCurrency;
  private apiKey = environment.apiKey;

  constructor( private http: HttpClient) { }

  getTravels(origin: string, destination: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + origin + "/" + destination);
  }

  convertCurrency(): Observable<any> {
    return this.http.get(this.appConvertCurrency + this.apiKey);
  }
}
