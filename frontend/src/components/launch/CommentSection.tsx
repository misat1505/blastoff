import { ROUTES } from "../../lib/routes";
import StyledLink from "../StyledLink";

const CommentSection = () => {
  return (
    <div className="mb-4 rounded-md bg-slate-100 p-4 text-center shadow-md dark:bg-slate-900">
      <p className="mb-4">
        This is comment section. You can comment as anonymous or login.
      </p>
      <StyledLink className="text-sm font-semibold" to={ROUTES.LOGIN.path}>
        Login
      </StyledLink>
    </div>
  );
};

export default CommentSection;
