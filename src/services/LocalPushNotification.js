import PushNotification from 'react-native-push-notification';
import Logo from '../assets/logo.svg';

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification)
    },
    popInitialNotification: true,
    requestPermissions: true
});

export const LocalNotification = (title, message) => {
    PushNotification.localNotification({
        autoCancel: true,
        bigText: message,
        subText: 'Takebook',
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_launcher',
        title: title,
        message: message,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["Yes", "No"]'
    })
}