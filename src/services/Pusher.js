import Pusher from 'pusher-js/react-native';

const pusher = new Pusher('06aeebf69251841ae50a', {
	cluster: 'us2',
	forceTLS: true,
});

export function subscribeToChannel(channel) {
	return pusher.subscribe(channel);
}

export function unsubscribeChannel(channel) {
	pusher.unsubscribe(channel);
}
