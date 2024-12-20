import { z } from "zod";

export const commentFormSchema = z.object({
  text: z.string().min(1, { message: "Comment has to have text." }),
  responseId: z.number().nullable().optional(),
});

export type CommentFormType = z.infer<typeof commentFormSchema>;
