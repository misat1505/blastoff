import { LOGO_PATH } from "../constants";
import RegisterForm from "../components/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-300 p-4 text-center dark:bg-slate-700">
      <h2 className="mb-4 text-3xl font-semibold">Join Blastoff Community</h2>
      <div className="grid grid-cols-2 space-x-8">
        <img
          src={LOGO_PATH}
          alt="logo"
          className="mx-auto my-auto h-48 w-48 rounded-full object-cover"
        />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
