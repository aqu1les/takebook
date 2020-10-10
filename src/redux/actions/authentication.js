export const LOAD_INFO = 'LOAD_INFO';

export const LOAD_LIKES_SUCCESS = 'LOAD_LIKES_SUCCESS';

export const LOAD_INFO_SUCCESS = 'LOAD_INFO_SUCCESS';

export const LOAD_INFO_ERROR = 'LOAD_INFO_ERROR';

export const CHECK_TOKEN = 'CHECK_TOKEN';

export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS';

export const LOG_OUT = 'LOG_OUT';

export function loadAuthAction() {
	return { type: LOAD_INFO };
}

export function loadAuthErrorAction() {
	return { type: LOAD_INFO_ERROR };
}

export function setUserAction(user) {
	return { type: LOAD_INFO_SUCCESS, user };
}

export function checkTokenAction() {
	return { type: CHECK_TOKEN };
}

export function tokenValidated() {
	return { type: CHECK_TOKEN_SUCCESS };
}

export function logOutAction() {
	return { type: LOG_OUT };
}
