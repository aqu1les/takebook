import PushNotification from 'react-native-push-notification';

export default function notificationHandler(notification) {
	if (notification.foreground && !notification.userInteraction) {
		PushNotification.localNotification({
			id: notification.id,
			autoCancel: true,
			bigText: notification.notification.body,
			subText: notification.book.created_at || '',
			largeIcon: notification.cover,
			smallIcon: 'ic_notification',
			title: notification.notification.title,
			message: notification.notification.body,
			vibrate: true,
			vibration: 300,
			playSound: true,
			soundName: 'default',
			actions: '["OK"]',
			color: '#2bc1f3',
		});
	}
	if (notification.userInteraction) {
		notification.finish();
		PushNotification.cancelLocalNotifications({ id: notification.id });
		PushNotification.clearLocalNotification(Number(notification.id));
	}
}
