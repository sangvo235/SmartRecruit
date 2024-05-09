import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { Building2, MapPin, UserRound, BookType, Hash, Timer, Scroll, CalendarClock } from "lucide-react";
import { InviteType } from "../../molecules/InvitationTabs/InvitationTabs";
import { Separator } from "../Separator/Separator";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';

interface InviteCardProps {
  invite: InviteType;
}

const Card2 = React.forwardRef<
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
Card2.displayName = "Card2";

const CardContent2 = React.forwardRef<
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
        <AvatarImage src={invite.assessment.image_url} alt="company_logo" />
        <AvatarFallback>Smart Recruit</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2 font-medium">
        <div className="text-xl pb-1">Online Assessment: {invite.assessment.name}</div>
          <div className="flex h-5 text-muted-foreground items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                  <Building2 />
                  <span>{invite.assessment.job_company}</span>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center space-x-2">
                <MapPin />
                  <span>{invite.assessment.job_location}</span>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center space-x-2">
                <UserRound />
                  <span>{invite.assessment.job_title}</span>
              </div>
          </div>

          <div className="text-black pt-2"> 
            <div className="flex items-center mt-2">
              <Scroll className="w-6 h-6 mr-2" />
              <span>Your Score: {invite.score} / 100</span>
            </div>
          </div>
      </div>
      
        <Button size="invite" onClick={() => router.push(`/pages/invite/${invite.assessment.id}`)}>
          View Details
        </Button>
    </div>
  );
});
CardContent2.displayName = "CardContent2";


const CardFooter2 = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & 
  InviteCardProps
>(({ className, invite, ...props }, ref) => {

  const expireDate = new Date(invite.expire_date);
  const formattedExpireDateTime = format(expireDate, 'hh:mm aa @ dd/MM/yyyy');

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end space-x-4 px-4 pb-4 text-xs text-slate-600",
        className
      )}
      {...props}
    >
      <div className="flex items-center mt-2">
        <CalendarClock className="w-6 h-6 mr-2" />
        <span>{formattedExpireDateTime}</span>
      </div>
    </div>
  );
});

export {
  Card2,
  CardContent2,
  CardFooter2,
};