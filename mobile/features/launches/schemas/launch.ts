import { z } from "zod";

export const Agency = z.object({
  id: z.number(),
  name: z.string().nullable(),
  country: z.string().nullable(),
  description: z.string().nullable(),
  website: z.string().nullable(),
  image_url: z.string().nullable(),
});

export type Agency = z.infer<typeof Agency>;

export const Rocket = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image_url: z.string().nullable(),
  agency: Agency,
  diameter: z.number().nullable(),
  height: z.number().nullable(),
  no_stages: z.number().nullable(),
  mass: z.number().nullable(),
  rocket_thrust: z.number().nullable(),
  leo_capacity: z.number().nullable(),
  gto_capacity: z.number().nullable(),
  geo_capacity: z.number().nullable(),
  sso_capacity: z.number().nullable(),
  launch_cost: z.number().nullable(),
  launches_count: z.number().nullable(),
  successful_launches_count: z.number().nullable(),
  failed_launches_count: z.number().nullable(),
  pending_launches: z.number().nullable(),
  landings_count: z.number().nullable(),
  successful_landings_count: z.number().nullable(),
  failed_landings_count: z.number().nullable(),
});

export type Rocket = z.infer<typeof Rocket>;

export const Site = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  map_image_url: z.string().nullable(),
});

export type Site = z.infer<typeof Site>;

export const Launch = z.object({
  id: z.string(),
  mission_name: z.string().nullable(),
  description: z.string().nullable(),
  date: z.coerce.date(),
  image_url: z.string().nullable(),
  rocket: Rocket,
  status_name: z.string().nullable(),
  status_description: z.string().nullable(),
  url: z.string().nullable(),
  site: Site.nullable(),
});

export type Launch = z.infer<typeof Launch>;
