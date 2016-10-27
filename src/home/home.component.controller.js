export default function (dispatcher) {
    const ctrl = this;

    dispatcher.subscribe(onNewData);

    function onNewData(event) {
        console.log('event', event);
        if (event.type !== dispatcher.constants.AIRPORTS_DATA_RECEIVED) return;

        ctrl.airportsData = event.data;
    }

}