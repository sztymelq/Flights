import template from './flights-form-component.html';
import controller from './flights-form.controller.js';

export const FlightsFormComponent = {
    bindings: {
        routeInfo: '<',
        messages: '<',
        searchCallback: '&'
    },
    template,
    controller
};
