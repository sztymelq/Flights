import HomeComponentCtrl from './home.component.controller.js';
import dispatcherService from '../services/dispatcher.service.js';

(function (global) {
    'use strict';

    describe('Home Component Controller', function () {
        let ctrl, dispatcher;

        beforeEach(function () {
            dispatcher = dispatcherService();
            ctrl = new HomeComponentCtrl(dispatcher);
        });

        after(function () {
            dispatcher = null;
            ctrl = null;
        });

        it('Should initialize with proper interface', function () {
            assert.isFalse(ctrl.isDestinationInputVisible);
            assert.isNull(ctrl.routeInfo);
            assert.isNull(ctrl.airportsData);
            assert.isNull(ctrl.flightsInfo);
            assert.isDefined(ctrl.flightsVisible);
            assert.isDefined(ctrl.searchFlightsCallback);
        });

        it('Should assign airport data when notified', function () {
            dispatcher.notify(dispatcher.constants.AIRPORTS_DATA_RECEIVED, 'data');
            assert.equal(ctrl.airportsData, 'data');
        });

        it('Should assign available destinations when notified', function () {
            dispatcher.notify(dispatcher.constants.ORIGIN_AIRPORT_ADDED, {availableDestinations: 'data'});
            assert.equal(ctrl.availableDestinations, 'data');
            assert.isTrue(ctrl.isDestinationInputVisible);
        });

        it('Should clear routeInfo when notified', function () {
            dispatcher.notify(dispatcher.constants.ORIGIN_AIRPORT_REMOVED);
            assert.isNull(ctrl.routeInfo);
            assert.isFalse(ctrl.isDestinationInputVisible);
        });

        it('Should assign routeInfo when notified', function () {
            dispatcher.notify(dispatcher.constants.ROUTE_CONFIGURED, 'data');
            assert.equal(ctrl.routeInfo, 'data');
        });

    })

})(this);