import { User } from "./User";

export type Comment = {
  id: number;
  text: string;
  added_at: Date;
  user: User;
};
