import { useState } from "react";
import { ROUTES } from "../../lib/routes";
import StyledLink from "../StyledLink";
import Tooltip from "../Tooltip";
import { FaArrowDown } from "react-icons/fa";
import { cn } from "../../lib/utils";
import FormField from "../FormField";
import { BiSolidSend } from "react-icons/bi";
import { Comment as CommentType } from "../../types/Comment";
import { useQuery } from "react-query";
import { queryKeysBuilder } from "../../utils/queryKeysBuilder";
import { CommentService } from "../../services/CommentService";

const CommentSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-fit rounded-md bg-slate-100 text-center shadow-md dark:bg-slate-900">
      <OpenChatSectionButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <CommentGroup indent={0} repliesTo={undefined} />}
      {isOpen && <CommentForm />}
    </div>
  );
};

type OpenChatSectionButtonProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const OpenChatSectionButton = ({
  isOpen,
  setIsOpen,
}: OpenChatSectionButtonProps) => {
  return (
    <div className="w-full p-2">
      <Tooltip content={isOpen ? "Close comments" : "Open comments"}>
        <button
          className="flex w-full items-center justify-center rounded-md py-4 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FaArrowDown
            className={cn("transition-all", { "rotate-180": isOpen })}
          />
        </button>
      </Tooltip>
    </div>
  );
};

type CommentFormProps = {};

const CommentForm = ({}: CommentFormProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await new Promise((res) =>
      setTimeout(() => {
        res(null);
      }, 1000)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 flex w-full items-center space-x-4 rounded-md bg-slate-100 p-4 shadow-md dark:bg-slate-900"
    >
      <FormField
        error={undefined}
        placeholder="Type a comment..."
        className="flex-grow"
      />
      <Tooltip content="Send message">
        <button type="submit" className="p-2 text-orange-500">
          <BiSolidSend size={20} />
        </button>
      </Tooltip>
    </form>
  );
};

type CommentGroupProps = { repliesTo?: CommentType["id"]; indent: number };

const CommentGroup = ({ repliesTo, indent }: CommentGroupProps) => {
  const { data: comments, isLoading } = useQuery({
    queryFn: () => CommentService.getComments(repliesTo),
    queryKey: queryKeysBuilder.commentsGroup(repliesTo),
  });

  if (isLoading) return null;

  return (
    <>
      {comments!.map((c, id) => (
        <Comment key={id} comment={c} indent={indent} />
      ))}
    </>
  );
};

type CommentProps = { comment: CommentType; indent: number };

const Comment = ({ comment, indent }: CommentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className="p-2 hover:cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center space-x-2">
          <h2 className="font-semibold">{comment.user.username}</h2>
          <p>at {comment.added_at.toISOString()}</p>
        </div>
        <p className="text-start">{comment.text}</p>
      </div>
      {isExpanded && (
        <CommentGroup repliesTo={comment.id} indent={indent + 1} />
      )}
    </>
  );
};

export default CommentSection;
