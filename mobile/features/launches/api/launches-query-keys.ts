import { Launch } from "../schemas/launch";

export const LAUNCHES_QUERY_KEYS = {
  upcoming: () => ["launches", "upcoming"],
  details: (id: Launch["id"]) => ["launches", "details", { id }],
};
