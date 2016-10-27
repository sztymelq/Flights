export default function (dispatcher) {
    const ctrl = this;
    ctrl.filterByName = filterByName;
    ctrl.filterByCountry = filterByCountry;
    ctrl.filterByIATA = filterByIATA;

    dispatcher.subscribe(onNewData);

    function onNewData(event) {
        console.log('event', event);
        if (event.type !== dispatcher.constants.AIRPORTS_DATA_RECEIVED) return;

        ctrl.airportsData = event.data;
    }

    function filterByName(airport) {
        return isStringMatched(airport.name);
    }

    function filterByCountry(airport) {
        return isStringMatched(airport.country.name);
    }

    function filterByIATA(airport) {
        return isStringMatched(airport.iataCode);
    }

    function isStringMatched(query) {
        return lowerCase(query).indexOf(lowerCase(ctrl.searchQuery)) !== -1;
    }

    function lowerCase(target) {
        return target.toLowerCase();
    }
}