import { getLaunchByIdQueryOptions } from "./get-launch-by-id";
import { getUpcomingLaunchesQueryOptions } from "./get-upcoming-launches";

export const LAUNCHES_QUERY_OPTIONS = {
  upcoming: getUpcomingLaunchesQueryOptions,
  byId: getLaunchByIdQueryOptions,
};
