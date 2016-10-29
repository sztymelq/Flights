import template from './flights-table-component.html';
import controller from './flights-table.controller.js';

export const FlightsTableComponent = {
    bindings: {
        flights: '<'
    },
    template,
    controller
};
