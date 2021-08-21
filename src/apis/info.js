import { apiRoute, apiCloudinary } from '../utils/apiConfig';

const API = apiRoute;

export const getAppInfo = () => API.get('/info/info.json');