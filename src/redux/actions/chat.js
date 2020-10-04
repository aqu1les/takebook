import { getAllRooms, getMessages } from '../../services/ChatService';

export const LOAD_CHAT = 'LOAD_CHAT';

export const LOAD_CHAT_SUCCESS = 'LOAD_CHAT_SUCCESS';

export const LOAD_MESSAGES = 'LOAD_MESSAGES';

export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';

export const NEW_MESSAGE = 'NEW_MESSAGE';

export const NEW_CHAT = 'NEW_CHAT';

function loadChats() {
    return { type: LOAD_CHAT };
}

function loadChatsSuccess(chats) {
    return { type: LOAD_CHAT_SUCCESS, chats };
}

function loadMessages(room_id) {
    return { type: LOAD_MESSAGES, room_id };
}

function loadMessagesSuccess(room_id, messages) {
    return { type: LOAD_MESSAGES_SUCCESS, room_id, messages };
}

export function addNewMessage(room_id, message) {
    return { type: NEW_MESSAGE, room_id, message };
}

export function onNewChat(room) {
    return { type: NEW_CHAT, room };
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

export function loadMessagesAction(room_id) {
    return dispatch => {
        dispatch(loadMessages(room_id));
        getMessages(room_id)
            .then(response => {
                if (response.data) {
                    dispatch(loadMessagesSuccess(room_id, response.data));
                }
            })
            .catch(err => console.log(err));
    };
}
