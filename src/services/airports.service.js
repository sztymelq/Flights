export const AirportsService = ($http, dispatcher) => {
    let data;
    const config = {
        url: 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/'
    };

    return {
        initialize,
        getAll,
        getAirports,
        getCountries,
        getDiscounts,
        getMessages,
        getRoutes
    };

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
