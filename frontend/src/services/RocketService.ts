import { API_URL } from "@/constants";
import { Rocket } from "@/types/Rocket";
import axios from "axios";

export class RocketService {
  static async getRocketById(id: Rocket["id"]): Promise<Rocket | null> {
    const response = await axios.get(`${API_URL}/rockets/${id}/details`);
    return response.data;
  }
}
