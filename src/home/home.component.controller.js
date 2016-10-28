export default function (dispatcher) {
    const ctrl = this;
    ctrl.destinationAirportSelected = false;
    ctrl.$onDestroy = destroyHandler;

    dispatcher.subscribe(onNewData);

    function onNewData(event) {
        switch(event.type) {
            case dispatcher.constants.AIRPORTS_DATA_RECEIVED:
                saveAirportsData(event.data);
                break;
            default:
                break;
        }
    }

    function saveAirportsData(data) {
        ctrl.airportsData = data;
    }

    function destroyHandler() {
        dispatcher.unsubscribe(onNewData);
    }
}