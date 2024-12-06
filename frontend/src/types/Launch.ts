export type Launch = {
  id: string;
  name: string;
  description: string;
  net: Date;
  image: string;
  window: {
    start: Date;
    end: Date;
  };
  rocket: {
    id: number;
    name: string;
    image: string;
  };
  status: {
    id: number;
    name: string;
    description: string;
  };
  links: {
    live: string;
  };
  agency: {
    id: number;
    name: string;
    image_url: string;
    country: string;
    website: string;
    description: string;
  };
  site: {
    id: number;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    image_map: string;
  };
};
