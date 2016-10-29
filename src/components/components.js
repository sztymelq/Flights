import angular from 'angular';
import { DateWrapperComponent } from './date-wrapper/date-wrapper.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { AirportSelectorComponent } from './airport-selector/airport-selector.component';
import { AirportTileComponent } from './airport-tile/airport-tile.component';
import { FlightsFormComponent } from './flights-form/flights-form.component';
import { FlightsTableComponent } from './flights-table/flights-table.component';

export default angular.module('app.components', [])
.component('dateWrapper', DateWrapperComponent)
.component('dateSelector', DateSelectorComponent)
.component('airportSelector', AirportSelectorComponent)
.component('airportTile', AirportTileComponent)
.component('flightsForm', FlightsFormComponent)
.component('flightsTable', FlightsTableComponent)
.name;
