import { Rocket } from "../shemas/rocket";

export const ROCKETS_QUERY_KEYS = {
  all: () => ["rockets"] as const,
  details: (id: Rocket["id"]) => ["rockets", "details", { id }] as const,
};
