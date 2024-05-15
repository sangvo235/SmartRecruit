import * as React from "react";import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { CalendarDays } from "lucide-react";
import { Separator } from "../Separator/Separator";
import { JobType } from "../../molecules/JobList/JobList";
import { Building2, MapPin, PiggyBank } from 'lucide-react';
import { useRouter } from "next/navigation";
import apiService from "../../../services/apiService";
import { useState } from "react";

interface JobCardProps {
    job: JobType;
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
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
    React.HTMLAttributes<HTMLDivElement> & 
    JobCardProps &
    { userId: string }
>(({ className, job, userId, ...props }, ref) => {

  const router = useRouter(); 
  const [errors, setErrors] = useState<string[]>([]);

  const handleApplyClick = async () => {
    if (job === null) {
        return;
    }

    const response = await apiService.post(`/api/ml/apply/`, JSON.stringify({ user_id: userId, job_id: job.id }));

    if (response.access) {
        console.log("Application sent successfully!");
        const tmpMessage: string[] = Object.values(response).map((message: any) => {
            return message;
        })
        setErrors(tmpMessage);  
    } else {
        const tmpErrors: string[] = Object.values(response).map((error: any) => {
            return error;
        })
        setErrors(tmpErrors);      
    }   
};

  return (
    <div
      ref={ref}
      className={cn("flex items-center space-x-4 pt-6 pb-2 px-4", className)}
      {...props}
    >
      {/* Company Logo */}
      <Avatar className="w-20 h-20">
        <AvatarImage src={job.image_url} alt="company_logo" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      {/* Job Title, Company Logo, Location & Salary */}
      <div className="flex-1 space-y-2 font-medium">
          <div className="text-xl pb-1">{job.title}</div>

          <div className="flex h-5 text-muted-foreground items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                  <Building2 />
                  <span>{job.company}</span>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center space-x-2">
                  <MapPin />
                  <span>{job.location}</span>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center space-x-2">
                  <PiggyBank />
                  <span>${job.salary}</span>
              </div>
          </div>

          <div className="text-sm text-muted-foreground pt-2">{job.intro}</div>
          
          {errors.map((error, index) => {
            return (
            <div key={`error_${index}`} className="text-red-500 font-semibold text-sm mt-2">{error}</div>
            )
          })}
      </div>
      
      <Button size="invite" onClick={handleApplyClick}>
          Apply 
      </Button>

      <Button size="invite" variant="outline" onClick={() => router.push(`/pages/job/${job.id}`)}>
          Read More 
      </Button>
    </div>
  );
});
CardContent.displayName = "CardContent";

const calculateTimeAgo = (timestamp: number) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - timestamp) / 1000);

  // Time Interval Conversion
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

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & JobCardProps>(
  ({ className, ...props }, ref) => {
    const timestamp = new Date(props.job.created_at).getTime();

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
