import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
    baseURL: "http://10.0.0.5:8000"
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("userToken:TB");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(response => response,
    err => {
        if (err.response) {
            const { status, data } = err.response;
            if (status === 401) {
                if (data.error === "Incorrect Password") return "Senha Inválida!";
                else if (data.error === "User not found") return "E-mail inválido!";
                else {
                    AsyncStorage.removeItem("userToken:TB");
                    return;
                }
            }
            return err.response;
        }
    });

export default api;