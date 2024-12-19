import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import Tooltip from "./Tooltip";

type StyledLinkProps = PropsWithChildren<LinkProps> & {
  tooltip?: React.ReactNode;
};

const StyledLink = ({
  children,
  tooltip,
  className,
  ...rest
}: StyledLinkProps) => {
  const link = (
    <Link
      className={cn(
        "mx-auto flex w-fit items-center gap-x-4 rounded-sm bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );

  if (tooltip) return <Tooltip content={tooltip}>{link}</Tooltip>;

  return link;
};

export default StyledLink;
