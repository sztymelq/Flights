export const utils = ($http) => {
    return {
        checkResponseStatus,
        fetchData,
        onFetchError
    };


    function checkResponseStatus(response) {
        return response.statusText !== 'OK';
    }

    function onFetchError(response) {
        throw new Error('Could not fetch data from server.', response);
    }

    function fetchData(url) {
        return $http.get(url);
    }
};
