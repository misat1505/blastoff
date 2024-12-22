import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { Comment } from "@/types/Comment";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentFormSchema,
  CommentFormType,
} from "@/validators/CommentForm.validators";
import { CommentService } from "@/services/CommentService";
import { queryKeysBuilder } from "@/utils/queryKeysBuilder";
import { useQueryClient } from "react-query";
import { Launch } from "@/types/Launch";

type CommentSectionContextProps = PropsWithChildren & {
  launchId: Launch["id"];
};

type CommentFormEntries = {
  text: string;
  responseId?: Comment["id"] | null;
};

type CommentSectionContextProvidedValues = {
  launchId: Launch["id"];
  register: UseFormRegister<CommentFormEntries>;
  errors: FieldErrors<CommentFormEntries>;
  isSubmitting: boolean;
  setResponse: (comment: Comment | null) => void;
  responseId: Comment["id"] | null | undefined;
  response: Comment | null;
  submitForm: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

const CommentSectionContext = createContext<
  CommentSectionContextProvidedValues | undefined
>(undefined);

export const useCommentSectionContext = () => {
  const context = useContext(CommentSectionContext);
  if (context === undefined)
    throw new Error(
      "useCommentSectionContext called outside CommentSectionProvider."
    );
  return context;
};

const CommentSectionProvider = ({
  children,
  launchId,
}: CommentSectionContextProps) => {
  const queryClient = useQueryClient();
  const [response, setResponseInner] = useState<Comment | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<CommentFormType>({
    resolver: zodResolver(commentFormSchema),
  });

  const onSubmit: SubmitHandler<CommentFormType> = async (data) => {
    try {
      const comment = await CommentService.createComment(launchId, data);
      reset();
      queryClient.setQueryData<Comment[]>(
        queryKeysBuilder.commentsGroup(launchId, data.responseId || undefined),
        (oldComments) => {
          if (!oldComments) return [comment];
          return [...oldComments, comment];
        }
      );
      setResponseInner(null);
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const setResponse = (message: Comment | null) => {
    setResponseInner(message);
    setValue("responseId", message?.id);
  };

  const submitForm = handleSubmit(onSubmit);

  const { responseId } = watch();

  return (
    <CommentSectionContext.Provider
      value={{
        launchId,
        register,
        errors,
        isSubmitting,
        submitForm,
        responseId,
        setResponse,
        response,
      }}
    >
      {children}
    </CommentSectionContext.Provider>
  );
};

export default CommentSectionProvider;
