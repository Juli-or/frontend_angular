import { Component, inject } from '@angular/core';
import { HousingLocationInterface } from '../housing-location-interface';
import { CommonModule } from '@angular/common';
import { Housing } from '../housing';
import { HousingLocation } from '../housing-location/housing-location';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, HousingLocation],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  housingLocationList: HousingLocationInterface[] = [];
  filteredLocationList: HousingLocationInterface[] = [];
  housingService: Housing = inject(Housing);

  constructor() {
    this.housingService.getAllHousingLocation().then(
      (housingLocationList: HousingLocationInterface[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      }
    );
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      location => location?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
