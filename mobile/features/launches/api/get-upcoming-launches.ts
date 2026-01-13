import { api } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import z from "zod";
import { Launch } from "../schemas/launch";
import { LAUNCHES_QUERY_KEYS } from "./launches-query-keys";

export async function getUpcomingLaunches(): Promise<Launch[]> {
  const response = await api.get("/launches/future");
  return z.array(Launch).parse(response.data);
}

export const getUpcomingLaunchesQueryOptions = () =>
  queryOptions({
    queryFn: getUpcomingLaunches,
    queryKey: LAUNCHES_QUERY_KEYS.upcoming(),
  });
