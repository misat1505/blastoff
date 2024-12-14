import axios from "axios";
import { LoginFormValues } from "@/validators/LoginForm.validators";
import { User } from "@/types/User";
import { API_URL } from "@/constants";
import { RegisterFormValues } from "@/validators/RegisterForm.validators";

export class AuthService {
  static async login(data: LoginFormValues): Promise<User> {
    const response = await axios.post(`${API_URL}/users/login`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  static async register(data: RegisterFormValues): Promise<User> {
    const response = await axios.post(`${API_URL}/users/register`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  static async logout(): Promise<void> {
    await axios.post(
      `${API_URL}/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  static async me(): Promise<User | null> {
    const response = await axios.get(`${API_URL}/users/me`, {
      withCredentials: true,
    });
    return response.data;
  }
}
