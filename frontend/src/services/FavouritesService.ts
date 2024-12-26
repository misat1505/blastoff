import { API_URL } from "@/constants";
import { FavouriteAgency } from "@/types/Agency";
import axios from "axios";

const FAV_AGENCY_BASE = axios.create({
  baseURL: `${API_URL}/favourite-agencies`,
  withCredentials: true,
});

export class FavouritesService {
  static async getMyFavouriteAgencies(): Promise<FavouriteAgency[]> {
    const response = await FAV_AGENCY_BASE.get("/mine");
    return response.data;
  }
}
