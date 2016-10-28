export default function (dispatcher) {
    const ctrl = this;
    ctrl.destinationAirportSelected = false;

    dispatcher.subscribe(onNewData);

    ctrl.$onDestroy = destroyHandler;

    function onNewData(event) {
        switch(event.type) {
            case dispatcher.constants.AIRPORTS_DATA_RECEIVED:
                saveAirportsData(event.data);
                break;
            case dispatcher.constants.AIRPORT_SELECTED:
                console.log('airport selected', event.data);
                ctrl.destinationAirportSelected = true;
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