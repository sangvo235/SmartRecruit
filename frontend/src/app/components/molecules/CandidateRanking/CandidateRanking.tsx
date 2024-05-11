"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Scroll } from "lucide-react";
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

  const getOnlineAssessment = async () => {
    const tmpOnlineAssessment = await apiService.get("/api/online_assessments/");
    setOnlineAssessment(tmpOnlineAssessment.data);
  };

  useEffect(() => {
    getOnlineAssessment();
  }, []);

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
                  onSelect={(currentValue) => {
                    setValue({
                      label: `${assessment.name} - ${assessment.topic}`,
                      value: currentValue,
                    });
                    setOpen(false);
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

<Card>
<CardHeader>
    <CardTitle>hello</CardTitle>
    <CardDescription>
        <Scroll className="w-4 h-4 mr-2" />
        <span>Your Score: </span>
        <span>score / 100</span>
    </CardDescription>
</CardHeader>

<CardContent >
    hello
</CardContent>

<CardFooter>
        Apply 
</CardFooter>
</Card>
</>
  );
}