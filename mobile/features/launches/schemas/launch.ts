import { Rocket } from "@/features/rockets/shemas/rocket";
import { z } from "zod";

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
