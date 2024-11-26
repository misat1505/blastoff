import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField";
import { Button } from "../ui/button";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

type FormValues = z.infer<typeof schema>;

const LoginForm = () => {
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
        <Button disabled={isSubmitting}>Log in</Button>
      </div>
    </form>
  );
};

export default LoginForm;
