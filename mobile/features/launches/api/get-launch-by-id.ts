import { api } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import { Launch } from "../schemas/launch";
import { LAUNCHES_QUERY_KEYS } from "./launches-query-keys";

export async function getLaunchById(id: Launch["id"]): Promise<Launch | null> {
  const response = await api.get(`/launches/${id}/details`);
  if (response.status === 404) return null;
  return Launch.parse(response.data);
}

export const getLaunchByIdQueryOptions = (id: Launch["id"]) =>
  queryOptions({
    queryFn: () => getLaunchById(id),
    queryKey: LAUNCHES_QUERY_KEYS.details(id),
  });
