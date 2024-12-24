import { API_URL } from "@/constants";
import { Comment } from "@/types/Comment";
import { Launch } from "@/types/Launch";
import { CommentFormType } from "@/validators/CommentForm.validators";
import axios from "axios";

function processComment(data: any): Comment {
  const { added_at, ...rest } = data;
  return { added_at: new Date(added_at + "Z"), ...rest };
}

export class CommentService {
  static async getComments(
    launchId: Launch["id"],
    id?: Comment["id"]
  ): Promise<Comment[]> {
    const url = new URL(`${API_URL}/comments`);
    url.searchParams.append("launch_id", launchId);
    if (!!id) {
      url.searchParams.append("parent_comment_id", id.toString());
    }

    const response = await axios.get(url.toString());
    return response.data.map(processComment);
  }

  static async createComment(
    launchId: Launch["id"],
    data: CommentFormType
  ): Promise<Comment> {
    const payload = {
      text: data.text,
      parent_comment_id: data.responseId || null,
      launch_id: launchId,
    };

    const response = await axios.post(`${API_URL}/comments`, payload, {
      withCredentials: true,
    });
    return processComment(response.data);
  }
}
