import axios from 'axios';

let apiRoute;

apiRoute = axios.create({ baseURL: 'http://192.168.43.54:80/laundry_api' });
// apiRoute = axios.create({ baseURL: 'http://192.168.42.178:80/laundry_api' });
// apiRoute = axios.create({ baseURL: 'http://smartlaundry.com.ng/smart/laundry_api' });

let apiCloudinary;

apiCloudinary = axios.create({ baseURL: 'https://api.cloudinary.com/v1_1/diplees0r' });

// apiRoute.interceptors.request.use(async (req) => {
//     const userData = await AsyncStorage.getItem('@user')
//     if (!!userData) {
//       const data = JSON.parse(userData);
//       // console.log("Data: ", data.token);
//       req.headers =  {"auth-token": `${data.token}`};
//     }
  
//     return req;
//   });

export { apiRoute, apiCloudinary };