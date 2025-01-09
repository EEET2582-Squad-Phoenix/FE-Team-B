import { HOST_URL_A } from "./app-url-config";

export const PROJECT_SERVICE_URL_A = `${HOST_URL_A}/api/charity-project`;

export const PROJECT_CREATE_URL = `${PROJECT_SERVICE_URL_A}/createProject`;
export const PROJECT_ALL_URL = `${PROJECT_SERVICE_URL_A}/all`;
export const PROJECT_GET_HIGHLIGHTED_URL = `${PROJECT_SERVICE_URL_A}/highlighted`;

export const PROJECT_RECOVER_URL = `${PROJECT_SERVICE_URL_A}/recoverProject`;
export const PROJECT_HALT_URL = `${PROJECT_SERVICE_URL_A}/halt`;
export const PROJECT_TOGGLE_HIGHLIGHTED_URL = `${PROJECT_SERVICE_URL_A}/toggleHighlighted`;
export const PROJECT_CHECK_HIGHLIGHTED_GLOBAL_URL = `${PROJECT_SERVICE_URL_A}/checkHighlightedGlobal`;
export const PROJECT_CHECK_HIGHLIGHTED_REGIONAL_URL = `${PROJECT_SERVICE_URL_A}/checkHighlightedRegional`;

export const PROJECT_DELETE_URL = `${PROJECT_SERVICE_URL_A}/deleteProject`;
export const PROJECT_ADMIN_DELETE_URL = `${PROJECT_SERVICE_URL_A}/adminDelete`;
