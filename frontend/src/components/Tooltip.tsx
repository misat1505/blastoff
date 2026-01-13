import { useTooltipSwitch } from "@/hooks/useTooltipSwitch";
import React, { PropsWithChildren } from "react";
import {
  TooltipContent,
  Tooltip as TooltipLib,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type TooltipProps = PropsWithChildren & {
  content: React.ReactNode;
};

export default function Tooltip({ children, content }: TooltipProps) {
  const [areVisible] = useTooltipSwitch();

  if (!areVisible) return children as JSX.Element;

  return (
    <TooltipProvider>
      <TooltipLib>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-white dark:bg-black">
          {content}
        </TooltipContent>
      </TooltipLib>
    </TooltipProvider>
  );
}
