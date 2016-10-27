import template from './home.component.html';
import './home.component.scss';

homeComponentCtrl.$inject = ['AirportsService'];

export const HomeComponent = {
    bindings: {},
    template,
    controller: homeComponentCtrl
};

function homeComponentCtrl(AirportsService) {
    let airportsData;
    AirportsService.getAll().then(onNewData, onAirportsFetchError);

    function onNewData(response) {
        airportsData = response.data;
        console.log('airportsData', airportsData);
    }

    function onAirportsFetchError(response) {
        throw new Error('homeComponentCtrl: Could not fetch data from server.', response);
    }
}