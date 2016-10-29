import moment from 'moment';

export default function FlightsTableCtrl (dispatcher) {
    const ctrl = this;
    ctrl.computeTravelTime = computeTravelTime;
    ctrl.tableHeaders = ['Departure', 'Arrival', 'Price', 'Travel time'];
    ctrl.formatDate = formatDate;


    function formatDate(date) {
        return moment(date).format('LLL');
    }

    function computeTravelTime(flight) {
        const diff = moment(flight.dateTo).diff(moment(flight.dateFrom));
        const duration = moment.duration(diff);
        return `${duration._data.hours} hours and ${duration._data.minutes} minutes`;
    }
};