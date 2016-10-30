import AirportSelector from './airport-selector.controller.js';
import dispatcherService from '../../services/dispatcher.service.js';
(function (global) {
    'use strict';

    describe('Airport Selector Controller', function () {
        let dispatcher;
        let ctrl;
        let airportMock = {
            name: 'AwesomeName',
            country: {
                name: 'awesomeCountry'
            }
        };

        beforeEach(function () {
            dispatcher = dispatcherService();
            ctrl = new AirportSelector(dispatcher);
        });

        after(function () {
            ctrl = null;
            airportMock = null;
            dispatcher = null;
        });
        
        it('Should initialize with proper values', function () {
            assert.isDefined(ctrl.isAirportMatched);
            assert.isDefined(ctrl.onAirportSelected);
            assert.isDefined(ctrl.clearAirportSelected);
            assert.isDefined(ctrl.onFocus);
            assert.isDefined(ctrl.removeIconClicked);
            assert.isNull(ctrl.airportSelected);
            assert.isFalse(ctrl.isAutoCompleteVisible);
            assert.equal(ctrl.searchQuery, '');
        });

        it('Should notify when user selects airport', function () {
            dispatcher.subscribe(assertEvent);

            ctrl.onAirportSelected(airportMock);

            assert.equal(ctrl.airportSelected, airportMock);
            assert.equal(ctrl.searchQuery, `${airportMock.name} (${airportMock.country.name})`);
            assert.isFalse(ctrl.isAutoCompleteVisible);

            function assertEvent(event) {
                assert.isDefined(event);
                assert.isDefined(event.data);
                assert.equal(event.type, dispatcher.constants.AIRPORT_SELECTED);
                assert.equal(event.data, airportMock);
            }
        });

        it('Should clear selected airport by invoking method', function () {
            ctrl.clearAirportSelected();
            assert.isNull(ctrl.airportSelected);
        });

        it('Should perform proper actions when onFocus handler is executed', function () {
            dispatcher.subscribe(assertEvent);

            ctrl.airportSelected = 'airport';
            ctrl.onFocus();

            assert.equal(ctrl.searchQuery, '');
            assert.isTrue(ctrl.isAutoCompleteVisible);
            assert.isNull(ctrl.airportSelected);

            function assertEvent(event) {
                assert.isDefined(event);
                assert.isDefined(event.data);
                assert.equal(event.type, dispatcher.constants.AIRPORT_DESELECTED);
                assert.equal(event.data, ctrl.airportSelected);
            }
        });

        it('Should perform proper actions when removeIcon handler is executed', function () {
            dispatcher.subscribe(assertEvent);
            ctrl.removeIconClicked();

            assert.equal(ctrl.searchQuery, '');
            assert.isFalse(ctrl.isAutoCompleteVisible);
            assert.isNull(ctrl.airportSelected);

            function assertEvent(event) {
                assert.equal(event.type, dispatcher.constants.AIRPORT_DESELECTED);
            }
        });

    })

})(this);