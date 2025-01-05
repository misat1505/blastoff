import { Agency } from "./Agency";

export type Rocket = {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  agency: Agency;
  diameter: number | null;
  height: number | null;
  no_stages: number | null;
  mass: number | null;
  rocket_thrust: number | null;
  leo_capacity: number | null;
  gto_capacity: number | null;
  geo_capacity: number | null;
  sso_capacity: number | null;
  launch_cost: number | null;
  launches_count: number | null;
  successful_launches_count: number | null;
  failed_launches_count: number | null;
  pending_launches: number | null;
  landings_count: number | null;
  successful_landings_count: number | null;
  failed_landings_count: number | null;
};
