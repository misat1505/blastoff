import { getRocketByIdQueryOptions } from "./get-rocket-by-id";
import { getRocketsQueryOptions } from "./get-rockets";

export const ROCKETS_QUERY_OPTIONS = {
  all: getRocketsQueryOptions,
  byId: getRocketByIdQueryOptions,
};
