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
    return (token && token.exp * 1000 > Date.now() && token.auth[0] === 'ROLE_ADMIN');
}

export function getMemberId() {
    const token = decodeJwt();
    return (token && token.sub);
}