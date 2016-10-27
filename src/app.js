import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Dispatcher from './services/dispatcher.service.js';
import Components from './components/components';
import { HomeComponent } from './home/home.component';
import {CheapFlightService, AirportsService} from './services';

console.log('Components', Components);

angular.module('myApp', [uiRouter, Components])
    .service('AirportsService', ['$http', 'dispatcher', AirportsService])
    .run(['AirportsService', (AirportsService) => {AirportsService.initialize()}])
    .service('dispatcher', Dispatcher)
    .component('homePage', HomeComponent)
    .service('CheapFlightService', ['$http', CheapFlightService])
    .config(($stateProvider) => {
        'ngInject';
          $stateProvider
            .state('home', {
              url: '',
              template: '<home-page></home-page>'
            });
        });