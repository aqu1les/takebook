import {
    LOAD_CHAT,
    LOAD_CHAT_SUCCESS,
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    NEW_MESSAGE,
} from '../actions/chat';

const INITIAL_STATE = {
    loading: false,
    chats: [],
    loadingMessages: false,
};

export default function chatsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_CHAT: {
            return { ...state, loading: true };
        }
        case LOAD_CHAT_SUCCESS: {
            return {
                ...state,
                loading: false,
                chats: action.chats,
            };
        }
        case LOAD_MESSAGES: {
            return { ...state, loadingMessages: true };
        }
        case LOAD_MESSAGES_SUCCESS: {
            const newChats = this.state.chats.map(chat => {
                if (chat.id == action.room_id) {
                    chat.messages = action.messages;
                }
                return chat;
            });
            return {
                ...state,
                loading: false,
                chats: newChats,
                loadingMessages: false,
            };
        }
        case NEW_MESSAGE: {
            const chatsWithNewMessage = this.state.chats.map(chat => {
                if (chat.id == action.message.room_id) {
                    chat.messages = [...chat.messages, action.message];
                }
                return chat;
            });
            return {
                ...state,
                chats: chatsWithNewMessage,
            };
        }
        default:
            return state;
    }
}
