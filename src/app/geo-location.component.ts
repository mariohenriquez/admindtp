import { Component, Input, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import { SebmGoogleMap } from 'angular2-google-maps/core';

@Component({
  selector: 'geo-location',
  template: require('./geo-location.component.html')
})

export class GeoLocationComponent {
    API_KEY : string;

    modalVisible : boolean = false;
    @Input() viewOnly : boolean = false;

    innerLatitude : number;
    innerLongitude : number;

    selectedLatitude : number;
    selectedLongitude : number;

    searchInput : string = "";
    searching : boolean = false;
    searchErrorMessage : string;
    key: any;

    @Output() locationUpdated: EventEmitter<LatLng> = new EventEmitter<LatLng>();

    constructor() {
        this.API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    }

    openModal($event) {
        if (this.viewOnly) {
            return
        }

        this.modalVisible = true;
    }

    locationChanged($event){
        this.innerLatitude = $event.coords.lat;
        this.innerLongitude = $event.coords.lng;
    }

    closeModal(){
        if (this.viewOnly) {
            return
        }

        this.modalVisible = false;
    }

    saveChanges(){
        this.locationUpdated.emit({latitude: this.innerLatitude, longitude: this.innerLongitude});
        this.closeModal();
    }

    findLocations(){
        var geocoder = new google.maps.Geocoder()
        this.searching = true;
        geocoder.geocode( { 'address': this.searchInput },(results, status)  =>  {
            if (status == google.maps.GeocoderStatus.OK) {
                let location = results[0].geometry.location;
                this.innerLatitude = location.lat();
                this.innerLongitude = location.lng();
            } else {
                this.showError(`Could not find location for '${this.searchInput}'.`);
            }
            this.searching = false;
        });
    }

    showError(message: string){
        this.searchErrorMessage = message;
        setTimeout(() =>{
            this.searchErrorMessage = null;
        }, 1000)
    }

    @Input('latitude')
    set latitude(latitude: number){
        this.innerLatitude = latitude;
        this.selectedLatitude = latitude;
    }

    @Input('longitude')
    set longitude(longitude: number){
        this.innerLongitude = longitude;
        this.selectedLongitude = longitude;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      this.key = event.keyCode;
      if (this.key === 27 && this.modalVisible === true) {
        this.closeModal();
      }
    }
}

export interface LatLng {
    latitude: number;
    longitude: number;
}


