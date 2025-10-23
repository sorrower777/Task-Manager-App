import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'https://task-manager-app-7-n6ip.onrender.com/api/v1'
})