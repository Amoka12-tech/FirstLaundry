import { apiRoute, apiCloudinary } from '../utils/apiConfig';

const API = apiRoute;

export const placeOrder = (data, headers) => API.post('/home/place_order.php', data, headers);

export const getAllOrder = (data, headers) => API.post('/home/get_all_order.php', data, headers);

export const getOrder = (data, headers) => API.post('/home/get_order.php', data, headers);

export const cancelOrder = (data, headers) => API.post('/home/cancel_order.php', data, headers);

export const getDiscount = (data, headers) => API.post('/home/get_discount.php', data, headers);

export const getItemList = () => API.get('/items/Items.json');