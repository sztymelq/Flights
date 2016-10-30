import dispatcherService from './dispatcher.service.js';
import {CheapFlightService} from './cheapflights.service.js';

(function (global) {
    'use strict';

    let dispatcher, service;
    let utilsMock = {
        checkResponseStatus,
        fetchData,
        onFetchError
    };

    describe('Cheap Flights Service', function () {
        beforeEach(function () {
            dispatcher = dispatcherService();
            service = CheapFlightService(dispatcher, utilsMock);
        });

        after(function () {
            dispatcher = null;
            service = null;
            utilsMock = null;
        });

        it('Should validate routeInfo input interface', function () {
            try {
                service.fetch({invalidRouteObject: 555})
            } catch (err) {
                /Invalid flights config interface/.test(err);
            }
        });

        it('Should store flights fetched and resolve promise', function () {
            service.fetch({
                origin: {},
                destination: {},
                dateFrom: new Date(),
                dateTo: new Date()
            }).then((flights) => {
                assert.isDefined(flights);
                assert.equal(service.getAll(), flights);
            })
        });

        it('Should generate proper url by given routeInfo', function () {
            const assertUtils = {
                checkResponseStatus: () => false,
                fetchData: (url) => {
                    assert.equal(url, 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/A/to/A/A/A/250/unique/?limit=15&offset-0');
                    return {
                        then: () => false
                    }
                }
            };

            service = CheapFlightService(dispatcher, assertUtils);

            service.fetch({
                origin: {iataCode: 'A'},
                destination: {iataCode: 'A'},
                dateFrom: 'A',
                dateTo: 'A'
            });

        });

    });

    function onFetchError() {}
    function checkResponseStatus() {return true}
    function fetchData() {
        return Promise.resolve({
            data: 'data'
        });
    }

})(this);