import dispatcherService from './dispatcher.service.js';
import {AirportsService} from './airports.service.js';

(function (global) {
    'use strict';
    let testData = Object.freeze({
        airports: {
            'ANR': {name: 'awesomeAirport'},
            'POL': {name: 'niceAirport'}
        }
    });

    let dispatcher;
    let utilsMock = {
        checkResponseStatus,
        fetchData,
        onFetchError
    };

    describe('Airports Service', function () {
        beforeEach(function () {
            dispatcher = dispatcherService();
        });

        after(function () {
            testData = null;
            dispatcher = null;
            utilsMock = null;
        });

        it('Should initialize properly', function () {
            dispatcher.subscribe(handler);
            AirportsService(dispatcher, utilsMock).initialize();

            function handler(event) {
                assert.equal(event.type, dispatcher.constants.AIRPORTS_DATA_RECEIVED);
                assert.isDefined(event.data);
                assert.equal(event.data.airports, testData.airports);
            }
        });

        it('Should notify selected airport', function () {
            dispatcher.subscribe(handler);
            AirportsService(dispatcher, utilsMock).initialize();

            function handler(event) {
                if (event.type === dispatcher.constants.AIRPORTS_DATA_RECEIVED) {
                    dispatcher.notify(dispatcher.constants.AIRPORT_SELECTED, testData.airports.ANR);
                } else {
                    assert.equal(event.data.airport, testData.airports.ANR);
                    assert.isDefined(event.data.availableDestinations);
                }
            }
        });

        it('Should notify when user deselects origin airport', function () {
            dispatcher.subscribe((event) => {
                if (event.type === dispatcher.constants.AIRPORT_DESELECTED) return;

                assert.equal(event.type, dispatcher.constants.ORIGIN_AIRPORT_REMOVED)
            });
            AirportsService(dispatcher, utilsMock).initialize();
            dispatcher.notify(dispatcher.constants.AIRPORT_DESELECTED, testData.airports.POL);
        });


        it('Should notify selected route configured when both airports are selected by user', function () {
            dispatcher.subscribe(handler);
            AirportsService(dispatcher, utilsMock).initialize();

            function handler(event) {
                if (event.type === dispatcher.constants.AIRPORTS_DATA_RECEIVED) {
                    dispatcher.notify(dispatcher.constants.AIRPORT_SELECTED, testData.airports.ANR);
                    dispatcher.notify(dispatcher.constants.AIRPORT_SELECTED, testData.airports.ANR);
                } else if (event.type === dispatcher.constants.ROUTE_CONFIGURED) {
                    assert.isDefined(event.data.origin);
                    assert.isDefined(event.data.destination);
                }
            }
        });

    });

    function onFetchError() {}
    function checkResponseStatus() {return true}
    function fetchData() {
        return Promise.resolve({
            data: testData
        });
    }

})(this);