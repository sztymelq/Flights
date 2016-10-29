export default function (dispatcher) {
    const ctrl = this;
    ctrl.isDestinationInputVisible = false;
    ctrl.airportsData = null;
    ctrl.routeInfo = null;
    ctrl.$onDestroy = destroyHandler;

    dispatcher.subscribe(onNewData);

    function onNewData(event) {
        switch(event.type) {
            case dispatcher.constants.AIRPORTS_DATA_RECEIVED:
                saveAirportsData(event.data);
                break;
            case dispatcher.constants.ORIGIN_AIRPORT_ADDED:
                saveAvailableDestinations(event.data);
                ctrl.isDestinationInputVisible = true;
                break;
            case dispatcher.constants.ORIGIN_AIRPORT_REMOVED:
                ctrl.routeInfo = null;
                ctrl.isDestinationInputVisible = false;
                break;
            case dispatcher.constants.ROUTE_CONFIGURED:
                ctrl.routeInfo = event.data;
                break;
            case dispatcher.constants.FLIGHTS_DATA_FETCHED:
                console.log(event.data);
                break;
            default:
                break;
        }
    }

    function saveAirportsData(data) {
        ctrl.airportsData = data;
    }

    function saveAvailableDestinations(data) {
        ctrl.availableDestinations = data.availableDestinations;
    }

    function destroyHandler() {
        dispatcher.unsubscribe(onNewData);
    }
}