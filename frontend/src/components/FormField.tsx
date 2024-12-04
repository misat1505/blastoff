import React from "react";
import { cn } from "../lib/utils";
import { FieldError } from "react-hook-form";
import { Input } from "./ui/input";

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error: FieldError | undefined;
};

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ error, className, ...rest }, ref) => {
    return (
      <div>
        <Input
          ref={ref}
          {...rest}
          className={cn(
            `mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm`,
            className,
            {
              "border-red-500": error,
            }
          )}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
      </div>
    );
  }
);

export default FormField;
