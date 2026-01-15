import { api } from "@/lib/api-client";
import { removeDuplicates } from "@/utils/remove-duplicates";
import { sortByNullableNumber } from "@/utils/sort-by-nullable-number";
import { queryOptions } from "@tanstack/react-query";
import z from "zod";
import { RocketCore } from "../shemas/rocket";
import { ROCKETS_QUERY_KEYS } from "./rockets-query-keys";

export async function getRockets(): Promise<RocketCore[]> {
  const response = await api.get("/rockets");
  const rockets = z.array(RocketCore).parse(response.data);
  const withoutDuplicates = removeDuplicates(rockets, "name");
  const sorted = sortByNullableNumber(withoutDuplicates, "launches_count");
  return sorted;
}

export const getRocketsQueryOptions = () =>
  queryOptions({
    queryFn: getRockets,
    queryKey: ROCKETS_QUERY_KEYS.all(),
  });
