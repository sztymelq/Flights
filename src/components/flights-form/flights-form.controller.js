export default function FlightsFormCtrl () {
    const ctrl = this;

    ctrl.searchButtonClicked = searchButtonClicked;
    ctrl.hideValidationMessage = hideValidationMessage;
    ctrl.validationMessage = '';
    ctrl.hideValidationMessage();

    function convert(date) {
        return date.toISOString().split('T')[0];
    }

    function searchButtonClicked() {
        if (!ctrl.startDate || !ctrl.endDate) {
            if (!ctrl.endDate) ctrl.validationMessage = ctrl.messages.choose_return_date;
            if (!ctrl.startDate) ctrl.validationMessage = ctrl.messages.choose_departure_date;
            showValidationMessage();
            return;
        }

        const flightsReq = Object.assign(ctrl.routeInfo, {
            dateFrom: convert(ctrl.startDate),
            dateTo: convert(ctrl.endDate)
        });
        ctrl.searchCallback()(flightsReq);
    }

    function showValidationMessage() {
        ctrl.invalidInput = true;
    }

    function hideValidationMessage() {
        ctrl.invalidInput = false;
    }

};