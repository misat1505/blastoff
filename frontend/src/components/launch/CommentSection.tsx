import { useState } from "react";
import { ROUTES } from "../../lib/routes";
import StyledLink from "../StyledLink";
import Tooltip from "../Tooltip";
import { FaArrowDown } from "react-icons/fa";
import { cn } from "../../lib/utils";
import FormField from "../FormField";
import { BiSolidSend } from "react-icons/bi";

const CommentSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-fit rounded-md bg-slate-100 text-center shadow-md dark:bg-slate-900">
      <OpenChatSectionButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <div className="h-[1000px]">Content goes here...</div>}
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
      className="sticky bottom-0 flex w-full items-center space-x-4 bg-slate-100 p-4 shadow-md dark:bg-slate-900"
    >
      <FormField
        error={undefined}
        placeholder="Type a comment..."
        className="flex-grow"
      />
      <Tooltip content="Send message">
        <button type="submit" className="p-2 text-blue-500 hover:text-blue-700">
          <BiSolidSend size={20} />
        </button>
      </Tooltip>
    </form>
  );
};

export default CommentSection;
