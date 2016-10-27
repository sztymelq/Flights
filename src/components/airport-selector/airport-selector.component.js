import controller from './airport-selector.controller.js';
import template from './airport-selector.component.html';

export const AirportSelectorComponent = {
    bindings: {
        airports: '<',
        inputPlaceholder: '@'
    },
    template,
    controller
};