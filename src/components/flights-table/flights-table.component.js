import template from './flights-table-component.html';
import controller from './flights-table.controller.js';

controller.$inject = ['dispatcher'];

export const FlightsTableComponent = {
    bindings: {
        flights: '<'
    },
    template,
    controller
};
