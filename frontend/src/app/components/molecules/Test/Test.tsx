"use client"
import { Key, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { Button } from "@/app/components/atoms/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/atoms/Card/Card";
import { RadioGroup, RadioGroupItem } from "@/app/components/atoms/RadioGroup/RadioGroup";
import { Label } from "@/app/components/atoms/Label/Label";
import { Timer } from 'lucide-react';
import { UserProps } from "../UserDetails/UserDetails";

export type TestType = {
    questions: string[];
    time: string;
    name: string;
    answers: { [key: string]: string };
}

const Test: React.FC<UserProps> = ({ userId }) => {
  const [userIdS, setUserIdS] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [test, setTest] = useState([]);
  const [formValues, setFormValues] = useState<TestType | null>(null);
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
  const timerBoxRef = useRef<HTMLDivElement>(null); 
  const [shouldSubmitAutomatically, setShouldSubmitAutomatically] = useState(false);

  useEffect(() => {
    if (userId) {
      setUserIdS(userId);
    }
  }, [userId]);

  useEffect(() => {
    const getTest = async () => {
      try {
        let testFromCookies = document.cookie.match(new RegExp('(^| )' + `test_${id}` + '=([^;]+)'));
        if (!testFromCookies) {
          const response = await apiService.get(`/api/online_assessments/data/${id}`);
          console.log("Data fetched from server:", response);
          setTest(response.data);
          const questions = response.data.map((question: any) => Object.keys(question)[0]);
          setFormValues({ ...response, questions });
          setSelectedValues(Object.fromEntries(response.data.map((question: {}) => [Object.keys(question)[0], ""])));

          document.cookie = `test_${id}=${JSON.stringify(response)}; max-age=${60 * 60}; path=/`;
          document.cookie = `start_time_${id}=${Date.now()}; max-age=${60 * 60}; path=/`;
          document.cookie = `time_${id}=${response.time}; max-age=${60 * 60}; path=/`;
          activateTimer(response.time * 60); 
        } else {
          const parsedTest = JSON.parse(testFromCookies[2]);
          console.log("Data retrieved from cookies:", parsedTest);
          setTest(parsedTest.data);
          const questions = parsedTest.data.map((question: any) => Object.keys(question)[0]);
          setFormValues({ ...parsedTest, questions });
          setSelectedValues(Object.fromEntries(parsedTest.data.map((question: {}) => [Object.keys(question)[0], ""])));

          const startTime = parseInt(document.cookie.match(new RegExp('(^| )' + `start_time_${id}` + '=([^;]+)'))?.[2] || '0');
          const storedTime = parseInt(document.cookie.match(new RegExp('(^| )' + `time_${id}` + '=([^;]+)'))?.[2] || '0');
          const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
          const remainingTimeInSeconds = storedTime * 60 - elapsedTimeInSeconds;
          activateTimer(remainingTimeInSeconds);
        }
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };
    if (id) {
      getTest();
    }
  }, [id]);
  
  useEffect(() => {
    if (shouldSubmitAutomatically) {
      handleSubmit();
    }
  }, [shouldSubmitAutomatically]);
  
  const activateTimer = (time: number) => {
    const timerBox = timerBoxRef.current;
  
    if (timerBox) {
      let totalSeconds = time;
  
      const timer = setInterval(() => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
  
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');
  
        timerBox.innerHTML = `<b>${displayMinutes}:${displaySeconds}</b>`;
  
        document.cookie = `remaining_time_${id}=${totalSeconds}; max-age=${totalSeconds}; path=/`;
  
        totalSeconds--;
  
        if (totalSeconds < 0) {
          clearInterval(timer);
          setShouldSubmitAutomatically(true);
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

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
  
    try {
      const quizForm: { user_id: string, questions: string[], answers: string[] } = {
        user_id: userIdS || "", 
        questions: [],
        answers: []
      };
      
      Object.entries(selectedValues).forEach(([question, answer]) => {
        quizForm.questions.push(question);
        quizForm.answers.push(answer);
      });
  
      const response = await apiService.post(`/api/online_assessments/save/${id}`, JSON.stringify(quizForm));
  
      console.log("Test submitted successfully:", response); 
      document.cookie = `test_${id}=; max-age=0; path=/`;
      router.push(`/pages/invite`);
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