export default function (dispatcher) {
    const ctrl = this;

    clearSearchQuery();
    ctrl.airportSelected = null;
    ctrl.isAutoCompleteVisible = false;
    ctrl.isAirportMatched = isAirportMatched;
    ctrl.onAirportSelected = onAirportSelected;
    ctrl.clearAirportSelected = clearAirportSelected;
    ctrl.onFocus = onFocus;
    ctrl.removeIconClicked = removeIconClicked;

    function removeIconClicked() {
        clearSearchQuery();
        hideAutoComplete();
        onAirportDeselected();
    }

    function onFocus() {
        clearSearchQuery();
        onAirportDeselected();
        ctrl.isAutoCompleteVisible = true;
    }

    function clearAirportSelected() {
        ctrl.airportSelected = null;
    }

    function clearSearchQuery() {
        ctrl.searchQuery = '';
    }

    function hideAutoComplete() {
        ctrl.isAutoCompleteVisible = false;
    }

    function onAirportDeselected() {
        dispatcher.notify(dispatcher.constants.AIRPORT_DESELECTED, ctrl.airportSelected);
        ctrl.airportSelected = null;
    }

    function onAirportSelected(airport) {
        dispatcher.notify(dispatcher.constants.AIRPORT_SELECTED, airport);
        ctrl.airportSelected = airport;
        displayChosenAirport(airport);
        hideAutoComplete();
    }

    function displayChosenAirport(airport) {
        ctrl.searchQuery = `${airport.name} (${airport.country.name})`;
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


