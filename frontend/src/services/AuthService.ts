import axios from "axios";
import { LoginFormValues } from "../validators/LoginForm.validators";
import { User } from "../types/User";
import { API_URL } from "../constants";

export class AuthService {
  static async login(data: LoginFormValues): Promise<User> {
    const response = await axios.post(`${API_URL}/users/login`, data, {
      withCredentials: true,
    });
    return response.data;
  }
}
