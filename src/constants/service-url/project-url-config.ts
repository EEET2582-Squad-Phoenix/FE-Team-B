import { HOST_URL_A } from "./app-url-config";

export const PROJECT_SERVICE_URL_A = `${HOST_URL_A}/api/charity-project`;

export const PROJECT_CREATE_URL = `${PROJECT_SERVICE_URL_A}/createAdmin`;
export const PROJECT_ALL_URL = `${PROJECT_SERVICE_URL_A}/all`;
export const PROJECT_PAGINATION_URL = `${PROJECT_SERVICE_URL_A}/allProjects`;

export const PROJECT_UPDATE_URL = `${PROJECT_SERVICE_URL_A}/admin/update`;
export const PROJECT_APPROVE_URL = `${PROJECT_SERVICE_URL_A}/approve`;
export const PROJECT_RECOVER_URL = `${PROJECT_SERVICE_URL_A}/recoverProject`;
export const PROJECT_TOGGLE_HALTED_URL = `${PROJECT_SERVICE_URL_A}/toggleHalt`;

export const PROJECT_TOGGLE_HIGHLIGHTED_URL = `${PROJECT_SERVICE_URL_A}/toggleHighlighted`;
export const PROJECT_DEACTIVATE_URL = `${PROJECT_SERVICE_URL_A}/deactivate`;
export const PROJECT_RESTORE_URL = `${PROJECT_SERVICE_URL_A}/restore`;

export const PROJECT_DELETE_URL = `${PROJECT_SERVICE_URL_A}/adminDelete`;
