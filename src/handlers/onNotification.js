import PushNotification from "react-native-push-notification";

export default function notificationHandler(notification) {
    const totalNot = PushNotification.getApplicationIconBadgeNumber() || 0;
    if (notification.foreground) {
        console.log('FOREGROUND');
    }
    if (notification.userInteraction) {
        PushNotification.cancelLocalNotifications({ id: notification.id });

    }
    else {
        PushNotification.setApplicationIconBadgeNumber(totalNot + 1);
        console.log('REMOTE BOOK', notification);
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
            color: "#2bc1f3",
        });
    }
}