import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "danger" | "correct" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export const PlayButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const variants = {
      default: "bg-primary text-primary-foreground shadow-[0_4px_0_0_hsl(195,100%,35%)] hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground shadow-[0_4px_0_0_hsl(260,80%,55%)] hover:bg-secondary/90",
      danger: "bg-destructive text-destructive-foreground shadow-[0_4px_0_0_hsl(348,100%,51%)] hover:bg-destructive/90",
      correct: "bg-correct text-correct-foreground shadow-[0_4px_0_0_hsl(142,71%,35%)] hover:bg-correct/90",
      ghost: "bg-transparent text-foreground hover:bg-muted shadow-none",
      outline: "bg-background border-2 border-border text-foreground hover:bg-muted shadow-[0_4px_0_0_hsl(214,32%,80%)]",
    };

    const sizes = {
      default: "h-12 px-6 py-2 text-base",
      sm: "h-9 px-4 text-sm",
      lg: "h-14 px-8 text-lg",
      icon: "h-12 w-12",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-bold transition-all outline-none",
          "btn-push focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
PlayButton.displayName = "PlayButton";

export function ProgressBar({ value, max, variant = "default" }: { value: number, max: number, variant?: "default"| "correct" }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
      <div 
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out",
          variant === "default" ? "bg-primary" : "bg-correct"
        )}
        style={{ width: `${percentage}%` }}
      >
        {/* Shine effect */}
        <div className="w-full h-1/3 bg-white/20 rounded-full mt-0.5 mx-1" />
      </div>
    </div>
  );
}
