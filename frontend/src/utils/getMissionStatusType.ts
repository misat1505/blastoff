import { Mission } from "../types/Mission";

type MissionStatusType = "success" | "failure" | "other";

export function getMissionStatusType(
  statusID: Mission["status"]["id"]
): MissionStatusType {
  // TODO update based on true codes
  const positiveStatusCodes = [1, 2, 3];
  const negativeStatusCodes = [4, 5, 6];

  if (positiveStatusCodes.includes(statusID)) return "success";
  if (negativeStatusCodes.includes(statusID)) return "failure";
  return "other";
}
