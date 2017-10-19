import { Component, ElementRef, NgZone, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'places-autocomplete',
  templateUrl: './places-autocomplete.component.html',
  styleUrls: ['./places-autocomplete.component.css']
})
export class PlacesAutocompleteComponent implements OnInit { 

   @ViewChild("search")
  public searchElementRef: ElementRef;

  @Output() 
  public onChangeLocal = new EventEmitter();


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

  

     //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          
          //return the location to event onChangeLocal
          this.onChangeLocal.emit(
            {
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng() 
            }
          )
          
        });
      });
    });
  }

}
