import { Rocket } from "../shemas/rocket";

export type RecoveryVariant = "landing" | "catch";

export function getRecoveryVariant(rocket: Rocket): RecoveryVariant {
  // starship will be the only catchable rocket for a long time
  if (rocket.name.toLowerCase().includes("starship")) return "catch";
  return "landing";
}
