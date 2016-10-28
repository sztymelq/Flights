export default function (dispatcher) {
    const ctrl = this;

    let isAirportSelected = false;

    clearSearchQuery();
    ctrl.isAutoCompleteVisible = false;
    ctrl.isAirportMatched = isAirportMatched;
    ctrl.onAirportSelected = onAirportSelected;
    ctrl.onQueryChange = onQueryChange;
    ctrl.onFocus = onFocus;
    ctrl.removeIconClicked = removeIconClicked;

    function removeIconClicked() {
        clearSearchQuery();
        hideAutoComplete();
    }

    function onFocus() {
        clearSearchQuery();
        ctrl.isAutoCompleteVisible = true;
    }

    function onQueryChange() {
        isAirportSelected = false;
    }

    function clearSearchQuery() {
        ctrl.searchQuery = '';
    }

    function hideAutoComplete() {
        ctrl.isAutoCompleteVisible = false;
    }

    function onAirportSelected(airport) {
        dispatcher.notify(dispatcher.constants.AIRPORT_SELECTED, airport);
        isAirportSelected = true;
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


