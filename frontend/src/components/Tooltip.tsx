import React, { PropsWithChildren } from "react";
import {
  TooltipProvider,
  Tooltip as TooltipLib,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

type TooltipProps = PropsWithChildren & {
  content: React.ReactNode;
};

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipLib>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipLib>
    </TooltipProvider>
  );
}
