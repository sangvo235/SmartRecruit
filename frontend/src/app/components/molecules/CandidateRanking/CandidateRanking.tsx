"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Fingerprint, Mail, Scroll, UserRound } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../atoms/Button/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../atoms/Command/Command";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../atoms/Card/Card";
import { Popover, PopoverContent, PopoverTrigger } from "../../atoms/Popover/Popover";
import { OnlineAssessmentType } from "@/app/components/molecules/OnlineAssessment/OnlineAssessment";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";

export function CandidateRanking() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<{ label: string; value: string } | null>(null);
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
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invite details:", error);
      });
  };

  return (
    <>
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
            <CommandInput placeholder="Search online assessment..." />
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

      {results.map((result, index) => (
        <Card key={index}>
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
      ))}
    </>
  );
}