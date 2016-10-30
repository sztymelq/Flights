export default function (dispatcher, cheapFlightService) {
    const ctrl = this;
    ctrl.isDestinationInputVisible = false;
    ctrl.airportsData = null;
    ctrl.flightsInfo = null;
    ctrl.$onDestroy = destroyHandler;
    ctrl.flightsVisible = flightsVisible;
    ctrl.searchFlightsCallback = searchFlightsCallback;
    clearRouteInfo();

    dispatcher.subscribe(onNewData);

    function onNewData(event) {
        switch(event.type) {
            case dispatcher.constants.AIRPORTS_DATA_RECEIVED:
                assignAirportData(event.data);
                break;
            case dispatcher.constants.ORIGIN_AIRPORT_ADDED:
                assignAvailableDestinations(event.data);
                ctrl.isDestinationInputVisible = true;
                break;
            case dispatcher.constants.ORIGIN_AIRPORT_REMOVED:
                clearRouteInfo();
                ctrl.isDestinationInputVisible = false;
                break;
            case dispatcher.constants.ROUTE_CONFIGURED:
                ctrl.routeInfo = event.data;
                break;
            default:
                break;
        }
    }

    function searchFlightsCallback(flightsReq) {
        cheapFlightService.fetch(flightsReq).then(storeFlights);
    }

    function storeFlights(flights) {
        ctrl.flightsInfo = flights;
    }

    function clearRouteInfo() {
        ctrl.routeInfo = null;
    }

    function flightsVisible() {
        return ctrl.flightsInfo && ctrl.routeInfo;
    }

    function assignAirportData(data) {
        ctrl.airportsData = data;
    }

    function assignAvailableDestinations(data) {
        ctrl.availableDestinations = data.availableDestinations;
    }

    function destroyHandler() {
        dispatcher.unsubscribe(onNewData);
    }
}