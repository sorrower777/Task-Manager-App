import axios from "axios";

// Prefer a Vite env var when deployed; fall back to localhost for local dev
const baseHost = (import.meta?.env?.VITE_API_BASE_URL || "http://localhost:4500").replace(/\/+$/, "");

export const axiosClient = axios.create({
    baseURL: `${baseHost}/api/v1`,
});