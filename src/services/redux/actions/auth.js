export function setUserAction(user) {
    return { type: "SET_USER", user };
}
export function logoutAction() {
    return { type: "LOG_OUT" };
}