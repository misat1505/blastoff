import { Rocket } from "./Rocket";
import { Site } from "./Site";
import { User } from "./User";

export type Launch = {
  id: string;
  mission_name: string;
  description: string | null;
  date: Date;
  image_url: string;
  rocket: Rocket;
  status_name: string | null;
  status_description: string | null;
  url: string | null;
  site: Site | null;
};

export type FavouriteLaunch = {
  launch_id: Launch["id"];
  id: number;
  added_at: Date;
  user_id: User["id"];
};
