import FlightsFormCtrl from './flights-form.controller.js';

(function (global) {
    'use strict';

    describe('Flights Form Controller', function () {
        let controller;

        beforeEach(function () {
            controller = new FlightsFormCtrl();
        });

        after(function () {
            controller = null;
        });

        it('Should initialize with proper interface and hidden validation message', function () {
            assert.isDefined(controller.searchButtonClicked);
            assert.isDefined(controller.hideValidationMessage);
            assert.isFalse(controller.invalidInput);
            assert.equal(controller.validationMessage, '');
        });

        it('Should switch invalidInput flag by invoking method', function () {
            controller.invalidInput = true;
            controller.hideValidationMessage();
            assert.isFalse(controller.invalidInput);
        });

        it('Should choose proper validation message and toggle invalidInput flag when search button clicked', function () {
            //given
            controller.messages = {
                choose_return_date: 'return_message',
                choose_departure_date: 'departure_message'
            };

            //when
            controller.startDate = new Date();
            controller.searchButtonClicked();

            //then
            assert.equal(controller.validationMessage, controller.messages.choose_return_date);
            assert.isTrue(controller.invalidInput);

            //given
            controller.startDate = false;
            controller.endDate = new Date();

            //when
            controller.searchButtonClicked();

            //then
            assert.equal(controller.validationMessage, controller.messages.choose_departure_date);
        });

        it('Should call searchButton callback', function () {
            //given
            controller.routeInfo = {name: 'routeInfo'};
            controller.startDate = new Date();
            controller.endDate = new Date();

            //then
            controller.searchCallback = function () {
                return function (flights) {
                    assert.equal(flights.name, 'routeInfo');
                    assert.equal(flights.dateFrom, controller.startDate.toISOString().split('T')[0]);
                    assert.equal(flights.dateTo, controller.endDate.toISOString().split('T')[0]);
                }
            };

            //when
            controller.searchButtonClicked();
        });

    })

})(this);