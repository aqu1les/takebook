import { getAllRooms, getMessages } from '../services/ChatService';
import { Store } from './Store';

class ChatStore extends Store {
    state = {
        loading: false,
        chats: [],
        loadingMessages: false
    };

    constructor() {
        super();
    }

    reducer(action, payload) {
        switch (action) {
            case 'LOAD': {
                this.state = { ...this.state, loading: true };
                break;
            }

            case 'LOAD_MESSAGES': {
                this.state = { ...this.state, loadingMessages: true };
                break;
            }

            case 'LOAD_SUCCESS': {
                this.state = {
                    ...this.state,
                    loading: false,
                    chats: payload.chats,
                };
                break;
            }

            case 'LOAD_MESSAGES_SUCCESS': {
                const newChats = this.state.chats.map(chat => {
                    if (chat.id == payload.room_id) {
                        chat.messages = payload.messages;
                    }
                    return chat;
                });
                this.state = {
                    ...this.state,
                    loading: false,
                    chats: newChats,
                    loadingMessages: false
                };
                break;
            }

            case 'NEW_MESSAGE': {
                const chatsWithNewMessage = this.state.chats.map(chat => {
                    if (chat.id == payload.message.room_id) {
                        chat.messages = [...chat.messages, payload.message];
                    }
                    return chat;
                });
                this.state = {
                    ...this.state,
                    chats: chatsWithNewMessage,
                };
                break;
            }
        }
        this.notify();
    }

    loadRooms() {
        this.reducer('LOAD');
        getAllRooms()
            .then(response => {
                if (response.data) {
                    this.reducer('LOAD_SUCCESS', { chats: response.data });
                }
            })
            .catch(err => console.log(err));
    }

    loadMessages(id) {
        this.reducer('LOAD_MESSAGES');
        getMessages(id)
            .then(response => {
                if (response.data) {
                    this.reducer('LOAD_MESSAGES_SUCCESS', { room_id: id, messages: response.data });
                }
            })
            .catch(err => console.log(err));

    }

    onNewMessage(message) {
        this.reducer('NEW_MESSAGE', { message });
    }
}
export default new ChatStore();
