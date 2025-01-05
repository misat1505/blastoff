import { API_URL } from "@/constants";
import { Agency } from "@/types/Agency";
import axios from "axios";

export class AgencyService {
  static async getAgency(id: Agency["id"]): Promise<Agency | null> {
    const response = await axios.get(`${API_URL}/agencies/${id}`);
    return response.data;
  }
}
