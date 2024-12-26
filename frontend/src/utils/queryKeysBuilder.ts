import { Agency } from "@/types/Agency";
import { Comment } from "@/types/Comment";
import { Launch } from "@/types/Launch";
import { Rocket } from "@/types/Rocket";

export const queryKeysBuilder = {
  upcomingLaunches: () => ["upcoming-launches"] as const,
  rocket: (id: Rocket["id"]) => ["rocket", { id }] as const,
  launch: (id: Launch["id"]) => ["launch", { id }] as const,
  commentsGroup: (launchId: Launch["id"], replyId?: Comment["id"]) =>
    ["comments", { launchId, replyId }] as const,
  me: () => ["me"] as const,
  favouriteAgencies: () => ["favourite-agencies"] as const,
  favouriteLaunches: () => ["favourite-launches"] as const,
  agency: (id: Agency["id"]) => ["agency", { id }] as const,
};
