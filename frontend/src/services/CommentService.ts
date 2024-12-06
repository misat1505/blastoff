import { Comment } from "@/types/Comment";

export const directComments: Comment[] = [
  {
    id: 1,
    text: "This is a great article! Thanks for sharing.",
    added_at: new Date("2024-12-05T14:30:00Z"),
    user: {
      id: 101,
      username: "john_doe",
    },
  },
  {
    id: 2,
    text: "I found the explanation a bit unclear in the middle section. Could you elaborate?",
    added_at: new Date("2024-12-06T08:15:00Z"),
    user: {
      id: 102,
      username: "jane_smith",
    },
  },
  {
    id: 3,
    text: "Amazing! This solved a problem I've been struggling with for weeks.",
    added_at: new Date("2024-12-06T10:45:00Z"),
    user: {
      id: 103,
      username: "dev_guru",
    },
  },
];

export const replyComments: Comment[] = [
  {
    id: 4,
    text: "I disagree with some points, but overall, this was insightful.",
    added_at: new Date("2024-12-06T12:00:00Z"),
    user: {
      id: 104,
      username: "critical_thinker",
    },
  },
  {
    id: 5,
    text: "Can someone recommend further reading on this topic? Thanks in advance!",
    added_at: new Date("2024-12-06T13:30:00Z"),
    user: {
      id: 105,
      username: "curious_reader",
    },
  },
  {
    id: 6,
    text: "The diagrams and examples were particularly helpful. Great job!",
    added_at: new Date("2024-12-06T15:20:00Z"),
    user: {
      id: 106,
      username: "visual_learner",
    },
  },
];

export class CommentService {
  static async getComments(id?: Comment["id"]): Promise<Comment[]> {
    return await new Promise((res) => {
      setTimeout(() => {
        const comments = id ? directComments : replyComments;
        return res(comments);
      }, 1000);
    });
  }
}
