import { Rocket } from "./Rocket";
import { Site } from "./Site";

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
