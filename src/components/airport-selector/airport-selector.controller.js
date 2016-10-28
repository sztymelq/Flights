export default function (dispatcher) {
    const ctrl = this;

    clearSearchQuery();
    ctrl.isAirportSelected = false;
    ctrl.isAutoCompleteVisible = false;
    ctrl.isAirportMatched = isAirportMatched;
    ctrl.onAirportSelected = onAirportSelected;
    ctrl.onQueryChange = onQueryChange;
    ctrl.onFocus = onFocus;
    ctrl.removeIconClicked = removeIconClicked;

    function removeIconClicked() {
        if (!ctrl.isAirportSelected) return;

        clearSearchQuery();
        hideAutoComplete();
        onAirportDeselected();
    }

    function onFocus() {
        clearSearchQuery();
        ctrl.isAirportSelected = false;
        ctrl.isAutoCompleteVisible = true;
    }

    function onQueryChange() {
        ctrl.isAirportSelected = false;
    }

    function clearSearchQuery() {
        ctrl.searchQuery = '';
    }

    function hideAutoComplete() {
        ctrl.isAutoCompleteVisible = false;
    }

    function onAirportDeselected() {
        dispatcher.notify(dispatcher.constants.AIRPORT_DESELECTED, {});
        ctrl.isAirportSelected = false;
    }

    function onAirportSelected(airport) {
        dispatcher.notify(dispatcher.constants.AIRPORT_SELECTED, airport);
        ctrl.isAirportSelected = true;
        ctrl.searchQuery = airport.name;
        hideAutoComplete();
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


