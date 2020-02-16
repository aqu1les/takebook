import ApiService from "./ApiService";

export function getAllRooms() {
    return ApiService.get('/rooms');
}

export function getMessages(id) {
    return ApiService.get(`/rooms/${id}/messages`);
}