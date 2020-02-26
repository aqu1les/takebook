import { getAllRooms, getMessages } from '../../services/ChatService';

export const LOAD_CHAT = 'LOAD_CHAT';

export const LOAD_CHAT_SUCCESS = 'LOAD_CHAT_SUCCESS';

export const LOAD_MESSAGES = 'LOAD_MESSAGES';

export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';

export const NEW_MESSAGE = 'NEW_MESSAGE';

function loadChats() {
    return { type: LOAD_CHAT };
}

function loadChatsSuccess(chats) {
    return { type: LOAD_CHAT_SUCCESS, chats };
}

function loadMessages() {
    return { type: LOAD_MESSAGES };
}

function loadMessagesSuccess(room_id, messages) {
    return { type: LOAD_MESSAGES_SUCCESS, room_id, messages };
}

export function addNewMessage(room_id, message) {
    return { type: NEW_MESSAGE, room_id, message };
}

export function loadChatsAction() {
    return dispatch => {
        dispatch(loadChats());
        getAllRooms()
            .then(response => {
                if (response.data) {
                    dispatch(loadChatsSuccess(response.data));
                }
            })
            .catch(err => console.log(err));
    };
}

export function loadMessagesAction(id) {
    return dispatch => {
        dispatch(loadMessages());
        getMessages(id)
            .then(response => {
                if (response.data) {
                    dispatch(loadMessagesSuccess(id, response.data));
                }
            })
            .catch(err => console.log(err));
    };
}