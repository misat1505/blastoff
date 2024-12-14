import { LOGO_PATH } from "../constants";
import StyledLink from "./StyledLink";
import { ROUTES } from "../lib/routes";

type NotFoundPageProps = {
  title?: string;
  text?: string;
};

const NotFound = ({ title, text }: NotFoundPageProps) => {
  const displayTitle = title || "Resource not found";
  const displayText =
    text || "Oops! The page you're looking for doesn't exist.";

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
      <img src={LOGO_PATH} alt="App Logo" className="mb-4 h-24 w-24" />
      <h1 className="mb-2 text-3xl font-semibold">{displayTitle}</h1>
      <p className="mb-6 text-lg text-gray-600">{displayText}</p>
      <StyledLink to={ROUTES.HOME.$path()} className="font-semibold">
        Go Back to Home
      </StyledLink>
    </div>
  );
};

export default NotFound;
