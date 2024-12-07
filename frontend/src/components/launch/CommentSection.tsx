import { PropsWithChildren, useState } from "react";
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
import { IoIosArrowDown } from "react-icons/io";
import { HiReply } from "react-icons/hi";
import { formatCommentDate } from "../../utils/formatCommentDate";

const CommentSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-fit rounded-md bg-slate-100 text-center shadow-md dark:bg-slate-900">
      <OpenChatSectionButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>
        {isOpen && (
          <div className="px-4">
            <CommentGroup indent={1} repliesTo={undefined} />
          </div>
        )}
        {isOpen && <CommentForm />}
      </div>
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
      <div className="group flex items-center justify-between">
        <div className="flex w-full space-x-2">
          <IndentDisplay indent={indent} />
          <div className="p-2">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold">{comment.user.username}</h2>
              <p>| {formatCommentDate(comment.added_at)}</p>
            </div>
            <p className="text-start text-sm">{comment.text}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CommentButton
            onclick={() => console.log(`Setting ${comment.id} as reply to.`)}
            tooltipText="Reply"
            isExpanded={isExpanded}
          >
            <HiReply size={16} className="ml-0.5" />
          </CommentButton>
          <CommentButton
            onclick={() => setIsExpanded((prev) => !prev)}
            tooltipText={isExpanded ? "Close thread" : "Open thread"}
            isExpanded={isExpanded}
          >
            <IoIosArrowDown
              size={20}
              className={cn("transition-all", { "rotate-180": isExpanded })}
            />
          </CommentButton>
        </div>
      </div>
      {isExpanded && (
        <CommentGroup repliesTo={comment.id} indent={indent + 1} />
      )}
    </>
  );
};

type IndentDisplayProps = { indent: number };

const IndentDisplay = ({ indent }: IndentDisplayProps) => {
  return (
    <div className="flex">
      {Array.from({ length: indent }).map((_, i) => (
        <div
          key={i}
          className="h-auto w-2 border-l border-slate-500"
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

type CommentButtonProps = PropsWithChildren & {
  tooltipText?: string;
  isExpanded: boolean;
  onclick: () => void;
};

const CommentButton = ({
  tooltipText,
  isExpanded,
  onclick,
  children,
}: CommentButtonProps) => {
  return (
    <Tooltip content={tooltipText}>
      <button
        className={cn(
          "hidden h-6 w-6 rounded-sm p-0.5 hover:bg-slate-200 group-hover:block dark:hover:bg-slate-800",
          { block: isExpanded }
        )}
        onClick={onclick}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default CommentSection;
