import { Mission } from "@/types/Mission";
import { Rocket } from "../types/Rocket";

export const queryKeysBuilder = {
  upcomingLaunches: () => ["upcoming-launches"] as const,
  rocket: (id: Rocket["id"]) => ["rocket", { id }] as const,
  launch: (id: Mission["id"]) => ["launch", { id }] as const,
};
