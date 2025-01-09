import { HOST_URL_B } from "./app-url-config";

export const AUTH_SERVICE_URL = `${HOST_URL_B}/auth`;

export const AUTH_SIGNIN_URL = `${AUTH_SERVICE_URL}/login`;
export const AUTH_CHECK_EMAIL_URL = `${AUTH_SERVICE_URL}/check-email`;
export const AUTH_REGISTER_URL = `${AUTH_SERVICE_URL}/register`;

export const SEND_EMAIL_URL = `${HOST_URL_B}/notifications/send-notification`;