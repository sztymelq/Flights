import AirportSelector from './airport-selector.controller.js';

(function (global) {
    'use strict';

    describe('Airport Selector Controller', function () {
        let controller = new AirportSelector({});
        
        it('Should initialize with proper values', function () {
            console.log(controller.isAutoCompleteVisible);
            assert.isDefined(controller.isAirportMatched);
            assert.isDefined(controller.onAirportSelected);
            assert.isDefined(controller.clearAirportSelected);
            assert.isDefined(controller.onFocus);
            assert.isDefined(controller.removeIconClicked);
            assert.isNull(controller.airportSelected);
            assert.isFalse(controller.isAutoCompleteVisible);
            assert.equal(controller.searchQuery, '');
        });
    })

})(this);