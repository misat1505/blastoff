import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";
import {
  loginFormSchema,
  LoginFormValues,
} from "../../validators/LoginForm.validators";
import { AuthService } from "../../services/AuthService";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await AuthService.login(data);
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
