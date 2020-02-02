import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'native-base';
import App from '../app.json';
import api from './api';

const RemotePushController = () => {
    useEffect(() => {
        PushNotification.configure({
            onRegister: async function (token) {
                const fcmToken = await AsyncStorage.getItem('FCM Token');
                if (fcmToken === token.token) return;
                AsyncStorage.setItem('FCM Token', token.token);
                console.log('TOKEN:', token);
                api.post('/users/mobile-token', { token: token.token });
            },
            onNotification: function (notification) {
                console.log('REMOTE NOTIFICATION ==>', notification);
                PushNotification.configure({
                    largeIcon: "ic_launcher",
                    smallIcon: "ic_notification",
                })
                PushNotification.localNotification({
                    autoCancel: true,
                    bigText: notification.notification.body,
                    subText: 'Takebook',
                    largeIcon: 'ic_launcher',
                    smallIcon: 'ic_notification',
                    title: notification.notification.title,
                    message: notification.notification.body,
                    vibrate: true,
                    vibration: 300,
                    playSound: true,
                    soundName: 'default',
                    actions: '["Yes", "No"]'
                });
            },
            senderID: App.senderID,
            popInitialNotification: true,
            requestPermissions: true
        })
    }, [])
    return <View></View>;
}
export default RemotePushController;