import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JourneyService } from 'src/app/services/journey.service';
import { DataJourney } from './DataJourney';
import { Flight } from './Flight';
import { ErrorResponse } from './ErrorResponse';
import { ConvertCurrency } from './ConvertCurrency';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {
  form: FormGroup;
  journeyData! : DataJourney;
  journeyOrigin! : string;
  journeyDestination! : string;
  journeyPrice : number = 0;
  flights! :Flight[];
  errorResponse! : ErrorResponse;
  messageError! : string;
  containError : boolean = false;
  OriginUpperCase: string = '';
  DestinationUpperCase: string = '';
  areSameValues : boolean = false;
  valueRate : number = 1;
  selectedCurrency: string = "USD";
  optionsCurrency = [
    { label: 'Dollar', value: 'USD' },
    { label: 'Euro', value: 'EUR' },
    { label: 'Pound sterling', value: 'GBP' },
  ];

  constructor(private fb: FormBuilder, private _journeyService: JourneyService) { 
    this.form = this.fb.group({
      Origin: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      Destination: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  searchTravels(){
    const journey: any = {
      Origin: this.form.get('Origin')?.value,
      Destination: this.form.get('Destination')?.value,
    }

    if(journey.Origin == journey.Destination){
      this.areSameValues = true;
    }else{
      this.areSameValues = false;
      this._journeyService.getTravels(journey.Origin, journey.Destination).subscribe((data: DataJourney) => {
        this.journeyData = data;
        this.journeyOrigin = this.journeyData.journey.origin;
        this.journeyDestination = this.journeyData.journey.destination;
        this.journeyPrice = this.journeyData.journey.price;
        this.flights = this.journeyData.journey.flight;
        this.containError = false;

      }, (error: ErrorResponse) => {
        this.errorResponse = error;
        this.containError = true;
        this.messageError = this.errorResponse.error.message;
      })  
      this.form.reset();
    }
  }

  convertOriginUpperCase(){
    this.OriginUpperCase = this.OriginUpperCase.toUpperCase();
  }

  convertDestinationUpperCase(){
    this.DestinationUpperCase = this.DestinationUpperCase.toUpperCase();
  }

  onChangeCurrency() {
    this._journeyService.convertCurrency().subscribe((data: ConvertCurrency) => {
      console.log(data);

      switch(this.selectedCurrency){
        case "USD": this.valueRate = data.rates.USD;
          break;
        case "EUR": this.valueRate = data.rates.EUR;
          break;
        case "GBP": this.valueRate = data.rates.GBP;
          break;
      }
    })
  }
}
