import { registerUserDevice } from '../services/UserService';
import PushNotification from 'react-native-push-notification';
import notificationHandler from '../handlers/onNotification';
import AppJSON from '../app.json';

export function registerAppWithFCM() {
	PushNotification.configure({
		onRegister: ({ token }) => registerUserDevice(token),
		onNotification: notificationHandler,
		senderID: AppJSON.senderID,
		permissions: {
			alert: true,
			badge: true,
			sound: true,
		},
		popInitialNotification: true,
		requestPermissions: true,
	});
}
