import ApiService from './ApiService';

export function getAllRooms() {
    return ApiService.get('/rooms');
}

export function getMessages(id) {
    return ApiService.get(`/rooms/${id}/messages`);
}

export function createRoom(targetId, message) {
    return ApiService.post('/rooms', {
        target_id: targetId,
        message: message,
    });
}

export function sendNewMessage(roomId, message) {
    return ApiService.post(`/rooms/${roomId}/messages`, {
        message,
    });
}
