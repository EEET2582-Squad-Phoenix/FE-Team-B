import { HOST_URL_B } from "./app-url-config";

export const DONOR_SERVICE_URL_B = `${HOST_URL_B}/admin/donor`;
export const DONOR_ALL_URL = `${DONOR_SERVICE_URL_B}/all`;
export const DONOR_ID_URL = (id: string) => `${DONOR_SERVICE_URL_B}/${id}`;

export const DONOR_CREATE_URL = `${DONOR_SERVICE_URL_B}/`;
export const DONOR_UPDATE_URL = (id: string) => `${DONOR_SERVICE_URL_B}/${id}`;
export const DONOR_DELETE_URL = (id: string) => `${DONOR_SERVICE_URL_B}/${id}`;

export const CHARITY_SERVICE_URL_B = `${HOST_URL_B}/admin/charity`;
export const CHARITY_ALL_URL = `${CHARITY_SERVICE_URL_B}/all`;
export const CHARITY_URL = (id: string) => `${CHARITY_SERVICE_URL_B}/${id}`;

export const CHARITY_CREATE_URL = `${CHARITY_SERVICE_URL_B}/`;
export const CHARITY_UPDATE_URL = (id: string) => `${CHARITY_SERVICE_URL_B}/${id}`;
export const CHARITY_DELETE_URL = (id: string) => `${CHARITY_SERVICE_URL_B}/${id}`;