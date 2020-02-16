import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'native-base';
import App from '../app.json';
import api from './ApiService';

const RemotePushController = () => {
    useEffect(() => {
        PushNotification.configure({
            onRegister: async function (token) {
                AsyncStorage.setItem('FCM Token', token.token);
                api.post('/users/mobile-token', { token: token.token });
            },
            onNotification: function (notification) {
                console.log('REMOTE NOTIFICATION ==>', notification);
                PushNotification.localNotification({
                    autoCancel: true,
                    bigText: notification.notification.body,
                    subText: notification.book.created_at,
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
            },
            senderID: App.senderID,
            popInitialNotification: true,
            requestPermissions: true
        })
    }, [])
    return <View></View>;
}
export default RemotePushController;