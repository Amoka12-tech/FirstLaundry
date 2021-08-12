import { apiRoute, apiCloudinary } from '../utils/apiConfig';

const API = apiRoute;

export const placeOrder = (data, headers) => API.post('/home/place_order.php', data, headers);