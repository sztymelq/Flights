import template from './home.component.html';
import controller from './home.component.controller.js';
import './home.component.scss';

controller.$inject = ['dispatcher'];

export const HomeComponent = {
    bindings: {},
    template,
    controller
};

