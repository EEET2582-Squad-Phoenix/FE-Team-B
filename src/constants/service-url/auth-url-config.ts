import { HOST_URL_B } from "./app-url-config";

export const AUTH_SERVICE_URL = `${HOST_URL_B}/auth`;

export const AUTH_LOGIN_URL = `${AUTH_SERVICE_URL}/login`;
export const AUTH_LOGOUT_URL = `${AUTH_SERVICE_URL}/logout`;
export const AUTH_GET_ME_URL = `${AUTH_SERVICE_URL}/get-me`;
export const AUTH_CHECK_EMAIL_URL = `${AUTH_SERVICE_URL}/check-email`;
export const AUTH_REGISTER_URL = `${AUTH_SERVICE_URL}/register`;

export const SEND_EMAIL_URL = `${HOST_URL_B}/notifications/send-notification`;