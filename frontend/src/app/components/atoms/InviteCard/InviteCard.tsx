import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { CalendarDays, CalendarClock } from "lucide-react";
import { InviteType } from "../../molecules/InvitationTabs/InvitationTabs";
import { useRouter } from "next/navigation";
import { Separator } from "../Separator/Separator";
import { Building2, PiggyBank } from 'lucide-react';
interface InviteCardProps {
  invite: InviteType;
}

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full bg-white text-card-foreground shadow-lg my-4",
      className
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
      className
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
    React.HTMLAttributes<HTMLDivElement> & 
    InviteCardProps
>(({ className, invite, ...props }, ref) => {

  const router = useRouter(); 

  return (
    <div
      ref={ref}
      className={cn("flex items-center space-x-4 pt-6 pb-2 px-4", className)}
      {...props}
    >
      <Avatar className="w-20 h-20">
        <AvatarImage src="" alt="company_logo" />
        <AvatarFallback>Smart Recruit</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2 font-medium">
          <div className="text-xl pb-1">{invite.assessment}</div>

          <div className="flex h-5 text-muted-foreground items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                  <Building2 />
                  <span>new</span>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center space-x-2">
                  <PiggyBank />
                  <span>new</span>
              </div>
          </div>

          {/* <div className="text-sm text-muted-foreground pt-2">{job.intro}</div> */}
      </div>
      
      {/* Apply (will code this at a later time) */}
        <Button size="invite" onClick={() => router.push(`/pages/online-assessment/${invite.assessment}`)}>
          Accept
        </Button>

      <Button size="invite" variant="outline">
          Decline 
      </Button>
    </div>
  );
});
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
  React.HTMLAttributes<HTMLDivElement> & InviteCardProps
>(({ className, ...props }, ref) => {
  const timestampInvite = new Date(props.invite.invite_date).getTime();
  const timestampExpire = new Date(props.invite.expire_date).getTime();

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end space-x-4 px-4 pb-4 text-xs text-slate-600",
        className
      )}
      {...props}
    >
      <CalendarDays />
      <div className="pl-2">{calculateTimeAgo(timestampInvite)}</div>
      <CalendarClock />
      <div className="pl-2">{calculateTimeAgo(timestampExpire)}</div>
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
