"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Fingerprint, Mail, Scroll, UserRound, FileCheck2 } from "lucide-react";
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
  const [JobApplication, setJobApplication] = useState<JobApplicationType[]>([]);
  const [results, setResults] = React.useState<any[]>([]);

  const getJobApplication = async () => {
    const tmpJobApplication = await apiService.get("/api/jobs/application/");
    setJobApplication(tmpJobApplication.data);
  };

  useEffect(() => {
    getJobApplication();
  }, []);

  console.log(value);

  const handleSelect = (selectedValue: string) => {
    apiService.get(`/api/jobs/${selectedValue}`)
      .then((response) => {
        const filteredResults = response.data.filter((job_application: { match_percentage: number | null; }) => job_application.match_percentage !== null && job_application.match_percentage !== null);
        const sortedResults = filteredResults.sort((a: { match_percentage: number; }, b: { match_percentage: number; }) => b.match_percentage - a.match_percentage);
        setResults(sortedResults);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  };

  return (
    <>
      <span className="mr-2 font-semibold">Listed Jobs:</span>

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
                {JobApplication.map((job) => (
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
        {results.map((result, index) => (
          <a
            key={index}
            href={`mailto:${result.user_email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4"
          >
            <Card className={"border-2 cursor-pointer transition duration-300 hover:border-blue-500"}>
              <CardHeader>
                <CardDescription>
                  <UserRound className="w-4 h-4 mr-2" />
                  <span>Name: </span>
                  <span>{result.user_name}</span>
                </CardDescription>
                <CardDescription>
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Email: </span>
                  <span>{result.user_email}</span>
                </CardDescription>
                <CardDescription>
                  <Fingerprint className="w-4 h-4 mr-2" />
                  <span>ID: </span>
                  <span>{result.user_id}</span>
                </CardDescription>
                <CardDescription>
                  <Scroll className="w-4 h-4 mr-2" />
                  <span>Job Application Match Score: </span>
                  <span>{result.match_percentage} / 100</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </>
  );
}