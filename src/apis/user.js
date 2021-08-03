import { apiRoute, apiCloudinary } from '../utils/apiConfig';

const API = apiRoute;

const CLOUDINARY_API = apiCloudinary;

export const uploadImage = (data, headers) => CLOUDINARY_API.post('/image/upload', data, headers);

export const updateUser = (data, headers) => API.post('/user/update_user.php', data, headers);