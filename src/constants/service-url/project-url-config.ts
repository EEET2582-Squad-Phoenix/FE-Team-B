import HOST_URL from "./app-url-config";

export const PROJECT_SERVICE_URL = `${HOST_URL}/api/charity-project`;

export const PROJECT_CREATE_URL = `${PROJECT_SERVICE_URL}/createProject`;
export const PROJECT_ALL_URL = `${PROJECT_SERVICE_URL}/all`;
export const PROJECT_GET_HIGHLIGHTED_URL = `${PROJECT_SERVICE_URL}/highlighted`;

export const PROJECT_RECOVER_URL = `${PROJECT_SERVICE_URL}/recoverProject`;
export const PROJECT_HALT_URL = `${PROJECT_SERVICE_URL}/halt`;
export const PROJECT_TOGGLE_HIGHLIGHTED_URL = `${PROJECT_SERVICE_URL}/toggleHighlighted`;
export const PROJECT_CHECK_HIGHLIGHTED_GLOBAL_URL = `${PROJECT_SERVICE_URL}/checkHighlightedGlobal`;
export const PROJECT_CHECK_HIGHLIGHTED_REGIONAL_URL = `${PROJECT_SERVICE_URL}/checkHighlightedRegional`;

export const PROJECT_DELETE_URL = `${PROJECT_SERVICE_URL}/deleteProject`;
export const PROJECT_ADMIN_DELETE_URL = `${PROJECT_SERVICE_URL}/adminDelete`;
