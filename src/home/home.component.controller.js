export default function (dispatcher) {
    const ctrl = this;
    ctrl.isDestinationInputVisible = false;
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
                ctrl.isDestinationInputVisible = false;
                break;
            default:
                break;
        }
    }

    function saveAirportsData(data) {
        console.log('data', data);
        ctrl.airportsData = data;
    }

    function saveAvailableDestinations(data) {
        ctrl.availableDestinations = data.availableDestinations;
    }

    function destroyHandler() {
        dispatcher.unsubscribe(onNewData);
    }
}