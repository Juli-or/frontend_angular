import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housing } from '../housing';
import { HousingLocationInterface } from '../housing-location-interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(Housing);
  housingLocation: HousingLocationInterface | undefined;

  formAngular = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(
      (housingLocation) => this.housingLocation = housingLocation
    );
  }

  onSubmit() {
    this.housingService.submitApplication(
      this.formAngular.value.firstName ?? '',
      this.formAngular.value.lastName ?? '',
      this.formAngular.value.email ?? ''
    );
  }
}
