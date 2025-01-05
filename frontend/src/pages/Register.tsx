import { LOGO_PATH } from "@/constants";
import RegisterForm from "@/components/register/RegisterForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/routes";

const RegisterPage = () => {
  return (
    <div className="absolute left-1/2 top-[calc(50vh+2.5rem)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-100 p-4 text-center shadow-lg dark:bg-slate-900 lg:top-1/2">
      <h2 className="mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500">
        Join Blastoff Community
      </h2>
      <div className="grid-cols-2 lg:grid lg:space-x-8">
        <img
          src={LOGO_PATH}
          alt="logo"
          className="mx-auto my-4 h-48 w-48 rounded-full object-cover lg:my-auto"
        />
        <RegisterForm />
      </div>
      <p className="mt-4 text-sm">
        Already have an account? Log in{" "}
        <Link className="text-blue-500 underline" to={ROUTES.LOGIN.$path()}>
          here
        </Link>
        .
      </p>
    </div>
  );
};

export default RegisterPage;
