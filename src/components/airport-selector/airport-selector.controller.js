export default function (dispatcher) {
    const ctrl = this;

    let isAirportSelected = false;

    ctrl.searchQuery = '';
    ctrl.isAirportMatched = isAirportMatched;
    ctrl.onAirportSelected = onAirportSelected;
    ctrl.isAutoCompleteVisible = isAutoCompleteVisible;
    ctrl.onQueryChange = onQueryChange;

    function onQueryChange() {
        isAirportSelected = false;
    }

    function isAutoCompleteVisible() {
        return ctrl.searchQuery && !isAirportSelected;
    }

    function onAirportSelected(airport) {
        dispatcher.notify(dispatcher.constants.AIRPORT_SELECTED, airport);
        isAirportSelected = true;
    }

    function isAirportMatched(airport) {
        return filterByName(airport) || filterByCountry(airport) || filterByIATA(airport);
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
};


