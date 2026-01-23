import { Rocket } from "../shemas/rocket";

export function getIsRocketRecovariable(rocket: Rocket): boolean {
  if (!rocket.landings_count) return false;
  return rocket.landings_count > 0;
}
