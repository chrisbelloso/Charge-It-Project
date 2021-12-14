import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL;

const apiAuth = axios.create({ baseURL });

apiAuth.interceptors.request.use(async (config) => {
    let token;
    try {
        const jwt_data = await JSON.parse(localStorage.getItem("jwtprepmap"));
        token = jwt_data.token;
    } catch (error) {
        console.log(error);
    }

    if (token) {
        config.headers.authorization = token;
    }

    return config;
});

export default apiAuth;