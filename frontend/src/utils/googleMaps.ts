import { GOOGLE_MAPS_URL } from "../constants";

type buildGoogleMapsURLArgs = {
  latitude: number;
  longitude: number;
};

export function buildGoogleMapsURL({
  latitude,
  longitude,
}: buildGoogleMapsURLArgs): string {
  const url = new URL(GOOGLE_MAPS_URL);
  url.searchParams.set("q", `${latitude},${longitude}`);
  return url.toString();
}
