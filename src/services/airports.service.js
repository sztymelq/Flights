export const AirportsService = ($http, dispatcher) => {
    const config = {
        url: 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/'
    };
    let data;
    let destinationAirport = null;
    let originAirport = null;

    dispatcher.subscribe(onUserAction);

    function onUserAction(event) {
        switch (event.type) {
            case dispatcher.constants.AIRPORT_SELECTED:
                storeSelectedAirport(event.data);
                if (originAirport) onOriginAirportAdded();
                if (destinationAirport) notifyRouteConfigured();
                break;
            case dispatcher.constants.AIRPORT_DESELECTED:
                clearDeselectedAirport(event.data);
                if (!originAirport) onOriginAirportRemoved();
                break;
            default:
                break;
        }
    }

    return {
        initialize,
        getAll,
        getAirports,
        getCountries,
        getDiscounts,
        getMessages,
        getRoutes
    };

    function notifyRouteConfigured() {
        dispatcher.notify(dispatcher.constants.ROUTE_CONFIGURED, {});
    }

    function onOriginAirportRemoved() {
        dispatcher.notify(dispatcher.constants.ORIGIN_AIRPORT_REMOVED, originAirport);
    }

    function onOriginAirportAdded() {
        const availableRoutes = getRoutes()[getIATA(originAirport)];
        const availableDestinations = getAirports().filter((airport) => {
            return availableRoutes.includes(getIATA(airport));
        });

        dispatcher.notify(dispatcher.constants.ORIGIN_AIRPORT_ADDED, {
            airport: originAirport,
            availableDestinations: availableDestinations
        });
    }

    function clearDeselectedAirport(airport) {
        if (airport === originAirport) originAirport = null;
        if (airport === destinationAirport) destinationAirport = null;
    }

    function storeSelectedAirport(airport) {
        if (!originAirport) originAirport = airport;
        else destinationAirport = airport;
    }

    function getIATA(airport) {
        return airport.iataCode;
    }

    function initialize() {
        fetchData().then(saveAndNotify, onFetchError);
    }

    function getAirports() {
        return data.airports;
    }

    function getCountries() {
        return data.countries;
    }

    function getDiscounts() {
        return data.discounts;
    }

    function getMessages() {
        return data.messages;
    }

    function getRoutes() {
        return data.routes;
    }

    function saveAndNotify(response) {
        if (response.status !== 200) return;

        data = response.data;
        dispatcher.notify(dispatcher.constants.AIRPORTS_DATA_RECEIVED, data);
    }

    function onFetchError(response) {
        throw new Error('homeComponentCtrl: Could not fetch data from server.', response);
    }

    function getAll() {
        return data;
    }

    function fetchData() {
        return $http.get(config.url);
    }
};
