import { Comment } from "@/types/Comment";
import { Launch } from "../types/Launch";
import { Rocket } from "../types/Rocket";

export const queryKeysBuilder = {
  upcomingLaunches: () => ["upcoming-launches"] as const,
  rocket: (id: Rocket["id"]) => ["rocket", { id }] as const,
  launch: (id: Launch["id"]) => ["launch", { id }] as const,
  commentsGroup: (id?: Comment["id"]) => ["comments", { id }] as const,
};
