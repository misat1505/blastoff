import { Link } from "react-router-dom";
import { LOGO_PATH } from "@/constants";
import { ROUTES } from "@/lib/routes";
import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-100 p-4 text-center shadow-lg dark:bg-slate-900">
      <h2 className="mb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500">
        Welcome to Blastoff
      </h2>
      <img
        src={LOGO_PATH}
        alt="logo"
        className="mx-auto my-4 h-48 w-48 rounded-full object-cover"
      />
      <LoginForm />
      <p className="mt-4 text-sm">
        Don&apos;t have an account? Create it{" "}
        <Link className="text-blue-500 underline" to={ROUTES.REGISTER.$path()}>
          here
        </Link>
        .
      </p>
    </div>
  );
};

export default LoginPage;
