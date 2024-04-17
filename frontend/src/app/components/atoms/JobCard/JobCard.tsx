import * as React from "react";
import { cn } from "../../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { Separator } from "../Separator/Separator";

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
    {/* Company Logo */}
    <Avatar className="w-20 h-20">
      <AvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>

    <div className="flex-1 space-y-2 font-medium">
        <div className="text-xl pb-1">Job Title</div>
        <div className="flex h-5 text-muted-foreground items-center space-x-4 text-sm">
            <div>Company</div>
            <Separator orientation="vertical" />
            <div>Location</div>
            <Separator orientation="vertical" />
            <div>Salary</div>
        </div>
        <div className="text-sm text-muted-foreground">This is a random discription of the job!</div>
        
    </div>
    
    <Button size="invite">
        <Link href="/pages/online-assessment/1">Apply</Link>
    </Button>

    <Button size="invite" variant="outline">
        Read More
    </Button>

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
  CardFooter,
  CardContent,
};