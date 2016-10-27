export default dispatcher;

function dispatcher() {
    const subscribers = [];
    const constants = {
       AIRPORTS_DATA_RECEIVED: 'AIRPORTS_DATA_RECEIVED'
    };

    return {
        subscribe,
        unsubscribe,
        notify,
        constants
    };

    function subscribe(subscriber) {
        if (!subscriber || subscribers.indexOf(subscriber) !== -1) return;

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
}