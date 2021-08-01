import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const login = (data, headers) => API.post('/auth/login.php', data, headers);
export const register = (data, headers) => API.post('/auth/register.php', data, headers);
export const verify = (data, headers) => API.post('/auth/verify.php', data, headers);
export const resendOtp = (data, headers) => API.post('/auth/resend_otp.php', data, headers);
export const recover = (data, headers) => API.post('/auth/recover.php', data, headers);
export const changePassword = (data, headers) => API.post('/auth/newPassword.php', data, headers);
