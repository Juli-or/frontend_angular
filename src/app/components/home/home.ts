 import { Component, inject } from '@angular/core';
 import { HousingLocation } from '../housing-location/housing-location';
 import { HousingLocationInterface } from '../housing-location-interface';
 import { CommonModule } from '@angular/common';
 import { Housing } from '../housing';
 @Component({
   selector: 'app-home',
   imports: [CommonModule, HousingLocation],
   templateUrl: './home.html',
   styleUrl: './home.css'
 })
 export class Home {
   housingLocationList: HousingLocationInterface[] = [];
   housingService: Housing = inject(Housing);
   filteredLocationList: HousingLocationInterface[] = [];
   constructor(){
     this.housingService.getAllHousingLocation().then((housingLocationList: HousingLocationInterface[]) => {
       this.housingLocationList = housingLocationList;
       this.filteredLocationList = housingLocationList;
     })
   }
   filterResults(text:string){
     if (!text) {
       this.filteredLocationList = this.housingLocationList;
       return;
     } else {
       this.filteredLocationList = this.housingLocationList.filter((HousingLocation) =>
         HousingLocation?.city.toLowerCase().includes(text.toLowerCase())
       )
     }
   }
 }