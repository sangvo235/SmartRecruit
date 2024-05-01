"use client"
import { Key, useEffect, useState } from "react"
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { Button } from "@/app/components/atoms/Button/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/app/components/atoms/Card/Card";
import { RadioGroup, RadioGroupItem } from "@/app/components/atoms/RadioGroup/RadioGroup";
import { Label } from "@/app/components/atoms/Label/Label";

const Test = () => {
  const params = useParams();
  const { id } = params;

  const [test, setTest] = useState<[]>([]);
  
    const getTest = async () => {
      const tmpTest = await apiService.get(`/api/online_assessments/data/${id}`);
      setTest(tmpTest.data);
    };
    
    useEffect(() => {
      getTest();
  }, []);

    return (
      <>
        {test.map((questionData, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>{Object.keys(questionData)[0]}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup>
                {questionData[Object.keys(questionData)[0]].map((answer, answerIndex) => (
                  <div key={answerIndex} className="flex items-center space-x-2">
                    <RadioGroupItem
                      id={`answer-${index}-${answerIndex}`} 
                      value={answer}
                      name={`question-${index}`}
                    />
                    <Label htmlFor={`answer-${index}-${answerIndex}`}>{answer}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </>
    );
}

export default Test;
