import controller from './airport-selector.controller.js';
import template from './airport-selector.component.html';

controller.$inject = ['dispatcher'];

export const AirportSelectorComponent = {
    bindings: {
        airportsAvailable: '<',
        inputPlaceholder: '@'
    },
    template,
    controller
};