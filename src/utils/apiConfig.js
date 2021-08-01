import axios from 'axios';

let apiRoute;

apiRoute = axios.create({ baseURL: 'http://192.168.8.101:80/laundry_api' });

// apiRoute.interceptors.request.use(async (req) => {
//     const userData = await AsyncStorage.getItem('@user')
//     if (!!userData) {
//       const data = JSON.parse(userData);
//       // console.log("Data: ", data.token);
//       req.headers =  {"auth-token": `${data.token}`};
//     }
  
//     return req;
//   });

export { apiRoute };