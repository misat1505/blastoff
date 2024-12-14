import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";
import {
  registerFormSchema,
  RegisterFormValues,
} from "../../validators/RegisterForm.validators";
import { AuthService } from "../../services/AuthService";
import { toast } from "../../hooks/use-toast";
import { useSessionContext } from "../../context/SessionContext";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });
  const { setUser } = useSessionContext();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const user = await AuthService.register(data);
      setUser(user);
      toast({
        title: "Registered successfully.",
        description: `Successfully registered as ${user.username}.`,
      });
    } catch (e: any) {
      toast({
        title: "Cannot register.",
        description: e.response?.data?.detail,
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-72 max-w-full space-y-4 text-left lg:max-w-[calc(100%-4rem)]"
    >
      <FormField
        error={errors.username}
        {...register("username")}
        placeholder="Enter your username"
      />
      <FormField
        error={errors.email}
        {...register("email")}
        placeholder="Enter your email address"
        type="email"
      />
      <FormField
        error={errors.password}
        {...register("password")}
        type="password"
        placeholder="Create a strong password"
      />
      <FormField
        error={errors.confirmPassword}
        {...register("confirmPassword")}
        type="password"
        placeholder="Re-enter your password"
      />

      <SubmitButton className="mx-auto" isPending={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Account"}
      </SubmitButton>
    </form>
  );
};

export default RegisterForm;
