import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";
import { useThemeContext } from "@/context/ThemeContext";

type SubmitButtonProps = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isPending: boolean;
    spinnerColors?: {
      light: string;
      dark: string;
    };
    spinner?: JSX.Element;
  };

const SubmitButton = ({
  children,
  isPending,
  className,
  spinnerColors,
  spinner,
  ...rest
}: SubmitButtonProps) => {
  const { theme } = useThemeContext();

  const getSpinnerColor = (): string => {
    if (theme === "dark") return spinnerColors?.dark || "#0f172a";
    return spinnerColors?.light || "#f1f5f9";
  };

  const spinnerColor = getSpinnerColor();

  return (
    <Button
      {...rest}
      disabled={isPending}
      className={cn("flex items-center justify-center space-x-4", className)}
    >
      {isPending && (spinner || <ClipLoader size={12} color={spinnerColor} />)}
      <div>{children}</div>
    </Button>
  );
};

export default SubmitButton;
