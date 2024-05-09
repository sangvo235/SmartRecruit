"use client"
import { Key, useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { Button } from "@/app/components/atoms/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/atoms/Card/Card";
import { RadioGroup, RadioGroupItem } from "@/app/components/atoms/RadioGroup/RadioGroup";
import { Label } from "@/app/components/atoms/Label/Label";
import { Timer } from 'lucide-react';

export type TestType = {
    questions: string[];
    time: string;
    name: string;
}

const Test = () => {
  
  const params = useParams();
  const { id } = params;

  const [test, setTest] = useState([]);
  const [formValues, setFormValues] = useState<TestType | null>(null);
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
  const timerBoxRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const getTest = async () => {
      try {
        const response = await apiService.get(`/api/online_assessments/data/${id}`);
        setTest(response.data);
        setFormValues(response);
        setSelectedValues(Object.fromEntries(response.data.map((question: {}) => [Object.keys(question)[0], ""])));
        activateTimer(response.time);
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };
    if (id) {
      getTest();
    }
  }, [id]);

  const activateTimer = (time: any) => {
    const timerBox = timerBoxRef.current; // Access the DOM element using the ref

    if (timerBox) {
      if (time.toString().length < 2) {
        timerBox.innerHTML = `<b>0${time}:00</b>`;
      } else {
        timerBox.innerHTML = `<b>${time}:00</b>`;
      }

      let minutes = time - 1;
      let seconds = 60;
      let displaySeconds;
      let displayMinutes;

      const timer = setInterval(() => {
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }

        if (minutes.toString().length < 2) {
          displayMinutes = `0${minutes}`;
        } else {
          displayMinutes = minutes;
        }

        if (seconds.toString().length < 2) {
          displaySeconds = `0${seconds}`;
        } else {
          displaySeconds = seconds;
        }

        timerBox.innerHTML = `<b>${displayMinutes}:${displaySeconds}</b>`;

        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          alert("Time's up!");
        }
      }, 1000);
    } else {
      console.error("Timer box element is not available.");
    }
  };

  const handleValueChange = (value: string, question: string) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [question]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const quizForm: { user_id: string, questions: string[], answers: string[] } = {
        user_id: 'e5b81074-f591-4e2b-bc7f-6742d0998387',
        questions: [],
        answers: []
      };
      
      Object.entries(selectedValues).forEach(([question, answer]) => {
        quizForm.questions.push(question);
        quizForm.answers.push(answer);
      });

      const response = await apiService.post(`/api/online_assessments/save/${id}`, JSON.stringify(quizForm));

      console.log("Test submitted successfully:", response); 
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };  
  
  return (
    <>
      <div className="flex justify-between items-center text-5xl font-semibold leading-none tracking-tight text-center pb-8">
        <span>{formValues?.name}</span>
        <span className="w-1/6 p-4 bg-gray-100 border border-gray-100 shadow-lg text-center text-xl font-semibold flex justify-center items-center">
          <Timer className="mr-2"/>
          <span
            ref={timerBoxRef}
            id="timer-box"
          />
        </span>
      </div>
      
      <form onSubmit={handleSubmit}>
        {test.map((questionData, index) => {
          const question = Object.keys(questionData)[0];
          return (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{`${index + 1}. ${question}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup onValueChange={(value) => handleValueChange(value, question)}>
                  {(questionData[question] as string[]).map((answer: string, answerIndex: Key | null | undefined) => (
                    <div key={answerIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        id={`answer-${index}-${answerIndex}`}
                        value={answer}
                      />
                      <Label htmlFor={`answer-${index}-${answerIndex}`}>{answer}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          );
        })}
        <Button className="mt-6" type="submit" size="invite">
          Submit Online Assessment 
        </Button>
      </form>
    </>
  );
};

export default Test;