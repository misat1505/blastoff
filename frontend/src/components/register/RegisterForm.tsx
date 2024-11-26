import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField";
import { Button } from "../ui/button";

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await new Promise((res) =>
      setTimeout(() => {
        console.log("Form Data:", data);
        res(null);
      }, 1000)
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-72 space-y-4 text-left"
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

      <Button disabled={isSubmitting} className="mx-auto">
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
