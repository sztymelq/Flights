export const CheapFlightService = (dispatcher, utils) => {
    let flights = [];

    return {
        fetch,
        getAll
    };

    function fetch(flightsInfo) {
        return fetchFlights(flightsInfo).then(onFlightsReceived, utils.onFetchError);
    }

    function getAll() {
        return flights;
    }

    function onFlightsReceived(response) {
        if (utils.checkResponseStatus(response)) return;

        storeFlights(response.data);
        return Promise.resolve(flights);
    }

    function storeFlights(data) {
        flights = data.flights;
    }

    function fetchFlights(config) {
        validateConfigInterface(config);
        const url = `https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/${config.origin.iataCode}/to/${config.destination.iataCode}/${config.dateFrom}/${config.dateTo}/250/unique/?limit=15&offset-0`;

        return utils.fetchData(url);

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
