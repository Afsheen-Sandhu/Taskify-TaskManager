"use client";
import React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "destructive" | "ghost" | "outline" | "link";
type Size = "sm" | "md" | "lg" | "icon";

const variantToClasses: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  destructive: "bg-destructive text-white hover:opacity-90",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline: "border border-border text-foreground hover:bg-muted",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeToClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
  icon: "h-9 w-9 p-0",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
          variantToClasses[variant],
          sizeToClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;