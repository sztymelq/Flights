import moment from 'moment';

export default function FlightsTableCtrl () {
    const ctrl = this;
    let descending = false;
    const constants = {
        FLY_OUT: 'Fly out',
        FLY_BACK: 'Fly back',
        PRICE: 'Price',
        TRIP_DURATION: 'Trip Duration'
    };

    ctrl.tableHeaders = Object.keys(constants).map((name) => {
        return constants[name];
    });
    ctrl.formatDate = formatDate;
    ctrl.toggleFavourite = toggleFavourite;
    ctrl.sortBy = sortBy;
    ctrl.$onChanges = computeTripDurations;

    function sortBy(header) {
        let sortingProperty;
        descending = !descending;

        switch (header) {
            case constants.FLY_OUT:
                setSortingProperty('dateFrom');
                ctrl.flights.sort(byDate);
                break;
            case constants.FLY_BACK:
                setSortingProperty('dateTo');
                ctrl.flights.sort(byDate);
                break;
            case constants.PRICE:
                setSortingProperty('price');
                ctrl.flights.sort(byValue);
                break;
            case constants.TRIP_DURATION:
                setSortingProperty('tripDuration');
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

        function setSortingProperty(value) {
            sortingProperty = value;
        }
    }

    function formatDate(date) {
        return moment(date).format('LLL');
    }

    function toggleFavourite(flight) {
        flight.favourite = !flight.favourite;
    }

    function computeTripDurations() {
        ctrl.flights.forEach((flight) => {
            const diff = moment(flight.dateTo).diff(moment(flight.dateFrom));
            flight.tripDuration = moment.duration(diff);
        });
    }
};