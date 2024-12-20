import { API_URL } from "@/constants";
import { Launch } from "@/types/Launch";
import axios from "axios";

function processLaunchDates(data: any): Launch {
  const { date, ...rest } = data;
  return { ...rest, date: new Date(date) };
}

export class LaunchService {
  static async getUpcomingLaunches(): Promise<Launch[]> {
    const response = await axios.get(`${API_URL}/launches/future`);
    return response.data.map(processLaunchDates);
  }

  static async getLaunchById(id: Launch["id"]): Promise<Launch | null> {
    const response = await axios.get(`${API_URL}/launches/${id}/details`);
    return processLaunchDates(response.data);
  }
}
