import { DeviceEventEmitter } from "react-native";

export default new class Listeners {

    register() {
        DeviceEventEmitter.addListener('notificationActionReceived', (action) => {
            const info = JSON.parse(action.dataJSON);
            if (info.action == 'OK') {
                PushNotification.cancelLocalNotifications({ id: info.id });
            }
        });
    }
}
