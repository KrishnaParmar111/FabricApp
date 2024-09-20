export const API_BASE_URL = 'https://app-interview.easyglue.in';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;

export const GET_TOP_REPOSITORY = getApiUrl('/top_repository.json');
export const GET_MIDDLE_REPOSITORY = getApiUrl('/middle_repository.json');
export const GET_BOTTOM_REPOSITORY = getApiUrl('/bottom_repository.json');
export const GET_CATEGORY_REPOSITORY = getApiUrl('/category_repository.json');
