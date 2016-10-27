import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Components from './components/components';
import { HomeComponent } from './home/home.component';
import {CheapFlightService, AirportsService} from './services';

angular.module('myApp', [uiRouter, Components])
    .component('homePage', HomeComponent)
    .service('CheapFlightService', CheapFlightService)
    .service('AirportsService', ['$http', AirportsService])
    .config(($stateProvider) => {
        'ngInject';
          $stateProvider
            .state('home', {
              url: '',
              template: '<home-page></home-page>'
            });
        });