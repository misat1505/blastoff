import { API_URL } from "@/constants";
import { Agency, FavouriteAgency } from "@/types/Agency";
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

  static async followAgency(agency_id: Agency["id"]): Promise<FavouriteAgency> {
    const response = await FAV_AGENCY_BASE.post("/", { agency_id });
    return response.data;
  }

  static async unfollowAgency(
    fav_agency_id: FavouriteAgency["id"]
  ): Promise<void> {
    const response = await FAV_AGENCY_BASE.delete(`/${fav_agency_id}`);
    return response.data;
  }
}
