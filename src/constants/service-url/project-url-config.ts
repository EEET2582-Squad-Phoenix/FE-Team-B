import { HOST_URL_A } from "./app-url-config";

export const PROJECT_SERVICE_URL_A = `${HOST_URL_A}/api/charity-project`;

export const PROJECT_CREATE_URL = `${PROJECT_SERVICE_URL_A}/createProject`; // used
export const PROJECT_ALL_URL = `${PROJECT_SERVICE_URL_A}/all`; // used
export const PROJECT_GET_HIGHLIGHTED_URL = `${PROJECT_SERVICE_URL_A}/highlighted`;

export const PROJECT_UPDATE_URL = `${PROJECT_SERVICE_URL_A}/updateProject`; // used
export const PROJECT_APPROVE_URL = `${PROJECT_SERVICE_URL_A}/approve`; // used
export const PROJECT_RECOVER_URL = `${PROJECT_SERVICE_URL_A}/recoverProject`;
export const PROJECT_HALT_URL = `${PROJECT_SERVICE_URL_A}/halt`; // used
export const PROJECT_RESUME_URL = `${PROJECT_SERVICE_URL_A}/unhalt`; // used

export const PROJECT_TOGGLE_HIGHLIGHTED_URL = `${PROJECT_SERVICE_URL_A}/toggleHighlighted`;
export const PROJECT_CHECK_HIGHLIGHTED_GLOBAL_URL = `${PROJECT_SERVICE_URL_A}/checkHighlightedGlobal`;
export const PROJECT_CHECK_HIGHLIGHTED_REGIONAL_URL = `${PROJECT_SERVICE_URL_A}/checkHighlightedRegional`;

export const PROJECT_DELETE_URL = `${PROJECT_SERVICE_URL_A}/deleteProject`;
export const PROJECT_ADMIN_DELETE_URL = `${PROJECT_SERVICE_URL_A}/adminDelete`; // used

// export const PROJECT_SERVICE_URL_B = `${HOST_URL_B}/charity/projects`;
// export const PROJECT_APPROVE_URL = `${PROJECT_SERVICE_URL_B}/approve`;
