"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Fingerprint, Mail, Scroll, UserRound } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../atoms/Button/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../atoms/Command/Command";
import { Card, CardHeader, CardDescription } from "../../atoms/Card/Card";
import { Popover, PopoverContent, PopoverTrigger } from "../../atoms/Popover/Popover";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";

export type JobApplicationType = {
    id: string;
    title: string;
    company: string;
    match_percentage: number;
    user_name : string;
    user_email : string;
    user_id : string;
}    

export function JobApplication() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<{ label: string; value: string } | null>(null);
  const [jobApplication, setJobApplication] = useState<JobApplicationType[]>([]);
  const [jobAppDetails, setJobAppDetails] = useState<JobApplicationType[]>([]);

  const getJobApplication = async () => {
    const tmpJobApplication = await apiService.get("/api/jobs/application/");
    setJobApplication(tmpJobApplication.data);
  };

  useEffect(() => {
    getJobApplication();
  }, []);


const handleSelect = async (selectedValue: string) => {
    try {
    const response = await apiService.get(`/api/jobs/application/${selectedValue}/`);
    const { data } = response;
    const jobAppDetails = data;

    const users: JobApplicationType[] = [];
    for (let i = 0; i < jobAppDetails.user_id.length; i++) {
        users.push({
            id: "", 
            title: "", 
            company: "", 
            user_id: jobAppDetails.user_id[i],
            user_name: jobAppDetails.user_name[i],
            user_email: jobAppDetails.user_email[i],
            match_percentage: jobAppDetails.match_percentage[i]
        });
    }

    users.sort((a, b) => b.match_percentage - a.match_percentage);

    setJobAppDetails(users);
    } catch (error) {
    console.error("Error fetching job details:", error);
    }
};

return (
    <>
      <span className="mr-2 text-lg font-semibold">Listed Jobs:</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline2"
            role="combobox"
            aria-expanded={open}
            className="w-[800px] justify-between"
          >
            {value ? value.label : "Select a job..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0">
          <Command>
            <CommandInput placeholder="Search for a job..." />
            <CommandEmpty>No jobs found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {jobApplication.map((job) => (
                  <CommandItem
                    key={job.id}
                    value={job.id}
                    onSelect={() => {
                      setValue({
                        label: `${job.company} - ${job.title}`,
                        value: job.id,
                      });
                      setOpen(false);
                      handleSelect(job.id); 
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value && value.value === job.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                        {job.company} - {job.title}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="my-6">
        {!value && jobAppDetails.length === 0 && <p className="text-lg mt-32">Please select a job.</p>}
        {value && jobAppDetails.length === 0 && <p className="text-lg mt-32">No job application details available.</p>}
        {jobAppDetails.map((user, index) => (
          <a
            key={index}
            href={`mailto:${user.user_email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4"
          >
            <Card className="border-2 cursor-pointer transition duration-300 hover:border-blue-500">
              <CardHeader>
                <CardDescription>
                  <UserRound className="w-4 h-4 mr-2" />
                  <span>Name: </span>
                  <span>{user.user_name}</span>
                </CardDescription>
                <CardDescription>
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Email: </span>
                  <span>{user.user_email}</span>
                </CardDescription>
                <CardDescription>
                  <Fingerprint className="w-4 h-4 mr-2" />
                  <span>ID: </span>
                  <span>{user.user_id}</span>
                </CardDescription>
                <CardDescription>
                  <Scroll className="w-4 h-4 mr-2" />
                  <span>Job Application Match Score: </span>
                  <span className="font-bold">{user.match_percentage}%</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </>
  );
}