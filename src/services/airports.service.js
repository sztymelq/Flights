export const AirportsService = ($http, dispatcher) => {
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
            case dispatcher.constants.FLIGHTS_DATA_REQUESTED:
                fetchFlights(event.data).then(onFlightsReceived, onFetchError);
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
        fetchData(config.url).then(onAirportsReceived, onFetchError);
    }

    function getAirports() {
        return airportsData.airports;
    }

    function getRoutes() {
        return airportsData.routes;
    }

    function onAirportsReceived(response) {
        if (checkResponseStatus(response)) return;

        saveAirports(response.data);
        dispatcher.notify(dispatcher.constants.AIRPORTS_DATA_RECEIVED, airportsData);
    }

    function onFlightsReceived(response) {
        if (checkResponseStatus(response)) return;

        dispatcher.notify(dispatcher.constants.FLIGHTS_DATA_FETCHED, response.data);
    }

    function saveAirports(data) {
        airportsData = data;
    }

    function checkResponseStatus(response) {
        return response.statusText !== 'OK';
    }

    function onFetchError(response) {
        throw new Error('airportService: Could not fetch data from server.', response);
    }

    function fetchData(url) {
        return $http.get(url);
    }

    function fetchFlights(config) {
        validateConfigInterface(config);
        const url = `https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/${config.origin.iataCode}/to/${config.destination.iataCode}/${config.dateFrom}/${config.dateTo}/250/unique/?limit=15&offset-0`;

        return fetchData(url);

        function validateConfigInterface() {
            const mandatory = ['origin', 'destination', 'dateFrom', 'dateTo'];
            const missing = [];

            mandatory.forEach((propertyName) => {
                if (!Object.keys(config).includes(propertyName)) missing.push(propertyName);
            });

            if (missing.length) throw new Error('Invalid flights config interface, missing following properties: ' + missing);
        }
    }


};
