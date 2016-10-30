import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Dispatcher from './services/dispatcher.service.js';
import Components from './components/components';
import { HomeComponent } from './home/home.component';
import {CheapFlightService, AirportsService, utils} from './services';


angular.module('myApp', [uiRouter, Components])
    .service('AirportsService', ['dispatcher', 'utils', AirportsService])
    .run(['AirportsService', (AirportsService) => {AirportsService.initialize()}])
    .service('dispatcher', Dispatcher)
    .service('utils', ['$http', utils])
    .component('homePage', HomeComponent)
    .service('CheapFlightService', ['dispatcher', 'utils', CheapFlightService])
    .config(($stateProvider) => {
        'ngInject';
          $stateProvider
            .state('home', {
              url: '',
              template: '<home-page></home-page>'
            });
        });