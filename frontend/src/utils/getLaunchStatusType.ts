import { Launch } from "@/types/Launch";

type LaunchStatusType = "success" | "failure" | "other";

export function getLaunchStatusType(
  statusID: Launch["status"]["id"]
): LaunchStatusType {
  // TODO update based on true codes
  const positiveStatusCodes = [1, 2, 3];
  const negativeStatusCodes = [4, 5, 6];

  if (positiveStatusCodes.includes(statusID)) return "success";
  if (negativeStatusCodes.includes(statusID)) return "failure";
  return "other";
}
