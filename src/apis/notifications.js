import { apiRoute, apiCloudinary } from '../utils/apiConfig';

const API = apiRoute;

export const getNotificationList = (data, header) => API.post('/user/get_notifications.php', data, header);