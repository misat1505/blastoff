export type Comment = {
  id: number;
  text: string;
  added_at: Date;
  user: {
    id: number;
    username: string;
  };
};
