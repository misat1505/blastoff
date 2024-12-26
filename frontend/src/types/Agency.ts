import { User } from "./User";

export type Agency = {
  id: number;
  name: string | null;
  country: string | null;
  description: string | null;
  website: string | null;
  image_url: string | null;
};

export type FavouriteAgency = {
  id: number;
  agency_id: Agency["id"];
  added_at: Date;
  user_id: User["id"];
};
