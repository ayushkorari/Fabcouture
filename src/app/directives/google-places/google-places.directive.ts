import {
  Directive,
  ElementRef,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(elRef: ElementRef) {
    // elRef will get a reference to the element where
    // the directive is placed
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    // @params: place - Google Autocomplete place object
    // @returns: location_obj - An address object in human readable format
    const location_obj = {};
    console.log(place)
    for (const i of Object.keys(place.address_components)) {
      const item = place.address_components[i];

      location_obj['formatted_address'] = place.formatted_address;
      if (item['types'].indexOf('locality') > -1) {
        location_obj['locality'] = item['long_name'];
      } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
        location_obj['admin_area_l1'] = item['short_name'];
      } else if (item['types'].indexOf('street_number') > -1) {
        location_obj['street_number'] = item['short_name'];
      } else if (item['types'].indexOf('route') > -1) {
        location_obj['route'] = item['long_name'];
      } else if (item['types'].indexOf('country') > -1) {
        location_obj['country'] = item['long_name'];
      } else if (item['types'].indexOf('postal_code') > -1) {
        location_obj['postal_code'] = item['short_name'];
      }
    }
    location_obj['lat'] = place.geometry.location.lat();
    location_obj['lng'] = place.geometry.location.lng();
    return location_obj;
  }

  ngOnInit() {
    const google = window['google'];

    const autocomplete = new google.maps.places.Autocomplete(this.element, {
      types: [] // 'establishment' / 'address' / 'geocode'
    });
    // Event listener to monitor place changes in the input
    autocomplete.addListener('place_changed', () => {
      // Emit the new address object for the updated place
      const place: any = autocomplete.getPlace();
      // console.log(place, 'object adress');

      this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }
}
