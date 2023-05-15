import jwt_decode from "jwt-decode";

export function decodeJwt() {
    const accessToken = window.localStorage.getItem('accessToken');
    return accessToken && jwt_decode(accessToken);
}

export function isLogin() {
    const token = decodeJwt();
    return !(token === undefined || token === null || token.exp * 1000 < Date.now());
}

export function isAdmin() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0] === 'ADMIN');
}

export function isProject() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0] === 'PROJECT');
}

export function isBoardAdmin() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0] === 'BOARD');
}

export function isPost() {
    const token = decodeJwt();
    return (token && token.exp * 1000 > Date.now() && token.auth[0] === 'POST');
}

export function getMemberId() {
    const token = decodeJwt();
    return (token && token.sub);
}