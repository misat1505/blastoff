import { Launch } from "../schemas/launch";

export const LAUNCHES_QUERY_KEYS = {
  upcoming: () => ["launches", "upcoming"] as const,
  details: (id: Launch["id"]) => ["launches", "details", { id }] as const,
};
