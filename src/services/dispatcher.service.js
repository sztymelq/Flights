export default dispatcher;

function dispatcher() {
    const subscribers = [];
    const constants = {
       AIRPORTS_DATA_RECEIVED: 'AIRPORTS_DATA_RECEIVED',
       AIRPORT_SELECTED: 'AIRPORT_SELECTED',
       AIRPORT_DESELECTED: 'AIRPORT_DESELECTED',
       ORIGIN_AIRPORT_ADDED: 'ORIGIN_AIRPORT_ADDED',
        ORIGIN_AIRPORT_REMOVED: 'ORIGIN_AIRPORT_REMOVED'
    };

    return {
        subscribe,
        unsubscribe,
        notify,
        constants
    };

    function subscribe(subscriber) {
        if (!subscriber || isAlreadySubscribed(subscriber)) return;

        subscribers.push(subscriber);
    }

    function unsubscribe(subscriber) {
        if (!subscriber) return;

        const index = subscribers.indexOf(subscriber);
        subscriber.splice(index, 1);
    }

    function notify(type, data) {
        subscribers.forEach(subscriber => {
            subscriber({type, data});
        })
    }

    function isAlreadySubscribed(subscriber) {
        return subscribers.indexOf(subscriber) !== -1;
    }
}