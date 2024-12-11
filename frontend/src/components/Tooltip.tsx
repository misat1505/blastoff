import React, { PropsWithChildren } from "react";
import {
  TooltipProvider,
  Tooltip as TooltipLib,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { useTooltipSwitch } from "../hooks/useTooltipSwitch";

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
        <TooltipContent>{content}</TooltipContent>
      </TooltipLib>
    </TooltipProvider>
  );
}
