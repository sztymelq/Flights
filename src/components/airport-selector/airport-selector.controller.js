export default function () {
    const ctrl = this;

    ctrl.isAirportMatched = isAirportMatched;

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


