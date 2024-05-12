"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Fingerprint, Mail, Scroll, UserRound, FileCheck2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../atoms/Button/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../atoms/Command/Command";
import { Card, CardHeader, CardDescription } from "../../atoms/Card/Card";
import { Popover, PopoverContent, PopoverTrigger } from "../../atoms/Popover/Popover";
import { OnlineAssessmentType } from "@/app/components/molecules/OnlineAssessment/OnlineAssessment";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";

export function CandidateRanking() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<{ label: string; value: string, pass: number } | null>(null);
  const [onlineAssessment, setOnlineAssessment] = useState<OnlineAssessmentType[]>([]);
  const [results, setResults] = React.useState<any[]>([]);

  const getOnlineAssessment = async () => {
    const tmpOnlineAssessment = await apiService.get("/api/online_assessments/");
    setOnlineAssessment(tmpOnlineAssessment.data);
  };

  useEffect(() => {
    getOnlineAssessment();
  }, []);

  console.log(value);

  const handleSelect = (selectedValue: string) => {
    apiService.get(`/api/invite/details/${selectedValue}`)
      .then((response) => {
        const filteredResults = response.data.filter((result: { score: string | null; }) => result.score !== null && result.score !== '');
        const sortedResults = filteredResults.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score);
        setResults(sortedResults);
      })
      .catch((error) => {
        console.error("Error fetching invite details:", error);
      });
  };

  console.log(onlineAssessment);

  return (
    <>
      <span className="mr-2 font-semibold">Online Assessment:</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline2"
            role="combobox"
            aria-expanded={open}
            className="w-[500px] justify-between"
          >
            {value ? value.label : "Select online assessment..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0">
          <Command>
            <CommandInput placeholder="Search for an online assessment..." />
            <CommandEmpty>No online assessment found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {onlineAssessment.map((assessment) => (
                  <CommandItem
                    key={assessment.id}
                    value={assessment.id}
                    onSelect={() => {
                      setValue({
                        label: `${assessment.name} - ${assessment.topic}`,
                        value: assessment.id,
                        pass: assessment.required_score_to_pass,
                      });
                      setOpen(false);
                      handleSelect(assessment.id); 
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value && value.value === assessment.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {assessment.name} - {assessment.topic}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="my-6">
        {value && value.pass && (
          <div className="mx-auto mb-6 font-semibold flex items-center justify-center">
            <FileCheck2 className="mr-2" />
            <span>Passing Score for Assessment: {value.pass} / 100</span>
          </div>
        )}

        {results.map((result, index) => (
          <a
            key={index}
            href={`mailto:${result.user_email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4"
          >
            <Card
              className={
                "border-2 cursor-pointer transition duration-300 hover:border-blue-500" +
                (result.score && value && result.score >= value.pass
                  ? " border-emerald-500"
                  : " border-gray-300")
              }
            >
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
                  <span>Candidate's Score: </span>
                  <span>{result.score} / 100</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </>
  );
}