import * as React from "react";
import { cn } from "../../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { CalendarDays, ChevronDown } from "lucide-react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full bg-white text-card-foreground shadow-lg my-4",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    // userId: string;
    // text: (string | JSX.Element)[];
    // isRead: boolean;
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-4 pt-6 pb-2 px-4", className)}
    {...props}
  >
    <Avatar className="w-20 h-20">
      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>

    <div className="flex-1 space-y-1">
      <p className="text-sm font-medium leading-none">Jared Smith</p>
      <div className="text-sm text-muted-foreground">Recruiter from Technology Games Company</div>
    </div>

    <Button size="invite">
        Accept
    </Button>

    <Button size="invite" variant="outline">
        Ignore
    </Button>

    <ChevronDown />

    {/* <div className="flex-1 space-y-1">
      <p className="text-sm font-medium leading-none">{userId}</p>
      <div className="text-sm text-muted-foreground">{text}</div>
    </div> */}

  </div>
));
CardContent.displayName = "CardContent";

const calculateTimeAgo = (timestamp: number) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - timestamp) / 1000);

  // Time Inverval Conversion
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  // Time Interval Logic
  for (const interval of intervals) {
    const time = Math.floor(seconds / interval.seconds);
    if (time >= 1) {
      return `${time} ${interval.label}${time > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    // stringTime: string;
  }
>(({ className, ...props }, ref) => {

    const stringTime = "2024-04-14T12:00:00Z";
  const timestamp = new Date(stringTime).getTime();

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end px-4 pb-4 text-xs text-slate-600",
        className,
      )}
      {...props}
    >
      <CalendarDays />
      <div className="pl-2">{calculateTimeAgo(timestamp)}</div>
    </div>
  );
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};