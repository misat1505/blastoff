import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";
import {
  loginFormSchema,
  LoginFormValues,
} from "@/validators/LoginForm.validators";
import { AuthService } from "@/services/AuthService";
import { useToast } from "@/hooks/use-toast";
import { useSessionContext } from "@/context/SessionContext";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/routes";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });
  const { toast } = useToast();
  const { setUser } = useSessionContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const user = await AuthService.login(data);
      setUser(user);
      toast({
        title: "Logged in successfully.",
        description: "You can now comment and follow launches and agencies.",
        action: (
          <ToastAction
            onClick={() => navigate(ROUTES.PROFILE.$path())}
            altText="Goto profile page."
          >
            Profile
          </ToastAction>
        ),
      });
    } catch (e: any) {
      toast({
        title: "Cannot log in.",
        description: e.response.data.detail,
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-[calc(100vw-4rem)] max-w-72 space-y-4 text-left sm:w-72"
    >
      <FormField
        error={errors.email}
        {...register("email")}
        placeholder="Email"
        type="email"
      />
      <FormField
        error={errors.password}
        {...register("password")}
        type="password"
        placeholder="Password"
      />
      <div className="w-full text-center">
        <SubmitButton className="mx-auto" isPending={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </SubmitButton>
      </div>
    </form>
  );
};

export default LoginForm;
