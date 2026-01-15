import { api } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import { Rocket } from "../shemas/rocket";
import { ROCKETS_QUERY_KEYS } from "./rockets-query-keys";

export async function getRocketById(id: Rocket["id"]): Promise<Rocket | null> {
  const response = await api.get(`rockets/${id}/details`);
  if (response.status === 404) return null;
  return Rocket.parse(response.data);
}

export const getRocketByIdQueryOptions = (id: Rocket["id"]) =>
  queryOptions({
    queryFn: () => getRocketById(id),
    queryKey: ROCKETS_QUERY_KEYS.details(id),
  });
