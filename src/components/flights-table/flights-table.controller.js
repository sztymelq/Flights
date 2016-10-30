import moment from 'moment';

export default function FlightsTableCtrl () {
    const ctrl = this;

    ctrl.tableHeaders = ['Departure', 'Arrival', 'Price', 'Travel time'];
    ctrl.formatDate = formatDate;
    ctrl.addFavourite = addFavourite;
    ctrl.sortBy = sortBy;
    let descending = false;

    ctrl.$onChanges = computeTravelTimes;

    function sortBy(header) {
        let sortingProperty;
        descending = !descending;

        switch (header) {
            case 'Departure':
                sortingProperty = 'dateFrom';
                ctrl.flights.sort(byDate);
                break;
            case 'Arrival':
                sortingProperty = 'dateTo';
                ctrl.flights.sort(byDate);
                break;
            case 'Price':
                sortingProperty = 'price';
                ctrl.flights.sort(byValue);
                break;
            case 'Travel time':
                sortingProperty = 'travelTime';
                ctrl.flights.sort(byValue);
                break;
            default:
                break;
        }

        function byDate(a, b) {
            if (descending) return moment(a[sortingProperty]).isAfter(moment(b[sortingProperty]));
            else return moment(a[sortingProperty]).isBefore(moment(b[sortingProperty]));
        }

        function byValue(a, b) {
            if (descending) return a[sortingProperty] > b[sortingProperty];
            else return a[sortingProperty] < b[sortingProperty];
        }
    }

    function formatDate(date) {
        return moment(date).format('LLL');
    }

    function addFavourite(flight) {
        flight.favourite = !flight.favourite;
    }

    function computeTravelTimes() {
        ctrl.flights.forEach((flight) => {
            const diff = moment(flight.dateTo).diff(moment(flight.dateFrom));
            flight.travelTime = moment.duration(diff);
        });
        console.log('ctrl.flights', ctrl.flights);
    }
};