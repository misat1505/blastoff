import { API_URL } from "@/constants/env";
import axios from "axios";

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});
