import moment from 'moment';

export default function FlightsTableCtrl () {
    const ctrl = this;
    ctrl.computeTravelTime = computeTravelTime;
    ctrl.tableHeaders = ['Departure', 'Arrival', 'Price', 'Travel time'];
    ctrl.formatDate = formatDate;
    ctrl.addFavourite = addFavourite;
    ctrl.sortBy = sortBy;
    let descending = false;


    function sortBy(header) {
        switch (header) {
            case 'Departure':
                ctrl.flights.sort(byDate);

                break;
            default:
                break;
        }

        function byDate(a, b) {
            console.log(a);
            console.log(b);
            descending = !descending;
            if (descending) return new Date(a.dateFrom) < new Date(b.dateFrom);
            else return new Date(a.dateFrom) > new Date(b.dateFrom);
        }
    }

    function formatDate(date) {
        return moment(date).format('LLL');
    }

    function addFavourite(flight) {
        flight.favourite = !flight.favourite;
    }

    function computeTravelTime(flight) {
        const diff = moment(flight.dateTo).diff(moment(flight.dateFrom));
        const duration = moment.duration(diff);
        return `${duration._data.hours} hours and ${duration._data.minutes} minutes`;
    }
};