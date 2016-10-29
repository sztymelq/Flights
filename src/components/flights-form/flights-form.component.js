import template from './flights-form-component.html';
import controller from './flights-form.controller.js';

controller.$inject = ['dispatcher'];

export const FlightsFormComponent = {
    bindings: {
        routeInfo: '<',
        messages: '<'
    },
    template,
    controller
};
