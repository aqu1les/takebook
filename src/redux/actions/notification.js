export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export function addNotificationAction(notification) {
	return { type: ADD_NOTIFICATION, notification };
}

export function setNotificationsAction(notifications) {
	return { type: SET_NOTIFICATIONS, notifications };
}

export function openNotificationAction(notification) {
	return { type: OPEN_NOTIFICATION, notification };
}
