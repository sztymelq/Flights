export const AirportsService = (dispatcher, utils) => {
    const config = {
        url: 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/'
    };
    let airportsData;
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
        initialize
    };

    function notifyRouteConfigured() {
        dispatcher.notify(dispatcher.constants.ROUTE_CONFIGURED, {origin: originAirport, destination: destinationAirport});
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
        utils.fetchData(config.url).then(onAirportsReceived, utils.onFetchError);
    }

    function getAirports() {
        return airportsData.airports;
    }

    function getRoutes() {
        return airportsData.routes;
    }

    function onAirportsReceived(response) {
        if (utils.checkResponseStatus(response)) return;

        saveAirports(response.data);
        dispatcher.notify(dispatcher.constants.AIRPORTS_DATA_RECEIVED, airportsData);
    }

    function saveAirports(data) {
        airportsData = data;
    }
};
