"use client"
import { Key, useEffect, useState } from "react"
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { Button } from "@/app/components/atoms/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/atoms/Card/Card";
import { RadioGroup, RadioGroupItem } from "@/app/components/atoms/RadioGroup/RadioGroup";
import { Label } from "@/app/components/atoms/Label/Label";

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
  const [selectedValues, setSelectedValues] = useState({}); 

  useEffect(() => {
    const getTest = async () => {
      try {
        const response = await apiService.get(`/api/online_assessments/data/${id}`);
        setTest(response.data);

        setFormValues(response);

        setSelectedValues(Object.fromEntries(response.data.map((question: {}) => [Object.keys(question)[0], ""])));
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };
    if (id) {
      getTest();
    }
  }, [id]);

  const handleValueChange = (value: string, question: string) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [question]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.entries(selectedValues).map(([question, value]) => ({
      [question]: [value],
    }));

    const response = await apiService.post(`/api/online_assessments/save/${id}`, JSON.stringify({ data: formData }));
    
    if ('detail' in response) {
        console.error("Error saving assessment:", response.detail);
    } else {
        console.log("Answers submitted successfully.");
    }

  };

  return (
    <>
      <div className="text-5xl font-semibold leading-none tracking-tight text-center pb-8">{formValues?.name}</div>

      <form onSubmit={handleSubmit}>
        {test.map((questionData, index) => {
          const question = Object.keys(questionData)[0];
          return (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{question}</CardTitle>
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