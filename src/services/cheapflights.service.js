export const CheapFlightService = ($http) => {
    const config = {
        url: 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/DUB/to/STN/2014-12-02/2015-02-02/250/unique/?limit=15&offset-0'
    };

    return {
        getAll
    };

    function getAll() {
        return $http.get(config.url);
    }
};
