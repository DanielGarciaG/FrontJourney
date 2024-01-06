import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JourneyService } from 'src/app/services/journey.service';
import { DataJourney } from './DataJourney';
import { Flight } from './Flight';
import { ErrorResponse } from './ErrorResponse';

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
  journeyPrice! : number;
  flights! :Flight[];
  errorResponse! : ErrorResponse;
  messageError! : string;
  containError! : boolean;


  constructor(private fb: FormBuilder, private _journeyService: JourneyService) { 
    this.form = this.fb.group({
      Origin: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      Destination: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.containError =  false;
  }

  searchTravels(){
    const journey: any = {
      Origin: this.form.get('Origin')?.value,
      Destination: this.form.get('Destination')?.value,
    }

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
