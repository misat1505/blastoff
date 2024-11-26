import { LOGO_PATH } from "../constants";
import RegisterForm from "../components/register/RegisterForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../lib/routes";

const RegisterPage = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-300 p-4 text-center shadow-lg dark:bg-slate-700">
      <h2 className="mb-4 text-3xl font-semibold">Join Blastoff Community</h2>
      <div className="grid grid-cols-2 space-x-8">
        <img
          src={LOGO_PATH}
          alt="logo"
          className="mx-auto my-auto h-48 w-48 rounded-full object-cover"
        />
        <RegisterForm />
      </div>
      <p className="mt-4 text-sm">
        Already have an account? Log in{" "}
        <Link className="text-blue-500 underline" to={ROUTES.LOGIN.path}>
          here
        </Link>
        .
      </p>
    </div>
  );
};

export default RegisterPage;
