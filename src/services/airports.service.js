export const AirportsService = ($http) => {
    const config = {
        url: 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/'
    };

    return {
        getAll
    };

    function getAll() {
        return $http.get(config.url);
    }
};
