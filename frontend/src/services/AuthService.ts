import axios from "axios";
import { LoginFormValues } from "../validators/LoginForm.validators";

export class AuthService {
  static async login(data: LoginFormValues): Promise<void> {
    const response = await axios.post(
      "http://localhost:8000/users/login",
      data,
      { withCredentials: true }
    );
  }
}
