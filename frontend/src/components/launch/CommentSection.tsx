import { PropsWithChildren, useState } from "react";
import { ROUTES } from "@/lib/routes";
import Tooltip from "../Tooltip";
import { FaArrowDown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import FormField from "../FormField";
import { BiSolidSend } from "react-icons/bi";
import { Comment as CommentType } from "@/types/Comment";
import { useQuery } from "react-query";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { CommentService } from "@/services/CommentService";
import { IoIosArrowDown } from "react-icons/io";
import { HiReply } from "react-icons/hi";
import { formatCommentDate } from "@/utils/formatCommentDate";
import { useCommentSectionContext } from "@/context/CommentSectionContext";
import { RxCross1 } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
import { useThemeContext } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { useSessionContext } from "@/context/SessionContext";

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

const CommentForm = () => {
  const { submitForm, response, errors, register, setResponse, isSubmitting } =
    useCommentSectionContext();
  const { theme } = useThemeContext();
  const { isLoggedIn } = useSessionContext();

  return (
    <form
      onSubmit={submitForm}
      className="sticky bottom-0 rounded-md bg-slate-100 shadow-md dark:bg-slate-900"
    >
      <div className="relative p-4">
        {response && (
          <div className="mb-2 flex w-full items-center justify-between text-start">
            <div>
              <h2 className="font-semibold">
                Response to {response.user.username}
              </h2>
              <p className="text-nowrap">{response.text}</p>
            </div>
            <Tooltip content="Cancel reply">
              <button
                onClick={() => setResponse(null)}
                className={cn(
                  "rounded-sm p-1 hover:bg-slate-200 dark:hover:bg-slate-800",
                  { "hover:cursor-not-allowed": isSubmitting }
                )}
                disabled={isSubmitting}
              >
                <RxCross1 />
              </button>
            </Tooltip>
          </div>
        )}
        <div className="flex w-full items-center space-x-4">
          <FormField
            {...register("text")}
            error={errors.text}
            placeholder="Type a comment..."
            className="flex-grow"
            disabled={isSubmitting}
          />
          <Tooltip content="Send message">
            <button
              type="submit"
              className={cn("p-2 text-orange-500", {
                "hover:cursor-not-allowed": isSubmitting,
              })}
            >
              {isSubmitting ? (
                <ClipLoader
                  size={20}
                  color={theme === "light" ? "#0f172a" : "#f1f5f9"}
                />
              ) : (
                <BiSolidSend size={20} />
              )}
            </button>
          </Tooltip>
        </div>
        {!isLoggedIn && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-100/60 hover:cursor-not-allowed dark:bg-slate-900/80">
            <Link
              className={buttonVariants({
                variant: "default",
              })}
              to={ROUTES.LOGIN.$path()}
            >
              Log in to comment
            </Link>
          </div>
        )}
      </div>
    </form>
  );
};

type CommentGroupProps = { repliesTo?: CommentType["id"]; indent: number };

const CommentGroup = ({ repliesTo, indent }: CommentGroupProps) => {
  const { launchId } = useCommentSectionContext();
  const { data: comments, isLoading } = useQuery({
    queryFn: () => CommentService.getComments(launchId, repliesTo),
    queryKey: queryKeysBuilder.commentsGroup(launchId, repliesTo),
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
  const { setResponse } = useCommentSectionContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoggedIn } = useSessionContext();

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
            onClick={() => setResponse(comment)}
            tooltipText={!isLoggedIn ? "Log in to reply" : "Reply"}
            isExpanded={isExpanded}
            disabled={!isLoggedIn}
            className={cn({ "hover:cursor-not-allowed": !isLoggedIn })}
          >
            <HiReply size={16} className="ml-0.5" />
          </CommentButton>
          <CommentButton
            onClick={() => setIsExpanded((prev) => !prev)}
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

type CommentButtonProps = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    tooltipText?: string;
    isExpanded: boolean;
  };

const CommentButton = ({
  tooltipText,
  isExpanded,
  className,
  children,
  ...rest
}: CommentButtonProps) => {
  return (
    <Tooltip content={tooltipText}>
      <button
        className={cn(
          "hidden h-6 w-6 rounded-sm p-0.5 hover:bg-slate-200 group-hover:block dark:hover:bg-slate-800",
          { block: isExpanded },
          className
        )}
        {...rest}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default CommentSection;
