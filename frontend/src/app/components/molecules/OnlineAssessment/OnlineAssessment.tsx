"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { Button } from "@/app/components/atoms/Button/Button";
import { useRouter } from "next/navigation";

export type OnlineAssessmentType = {
    id: string;
    name: string;
    topic: string;
    number_of_questions: number;
    time: number;
    required_score_to_pass: number;
    job: string;
    job_title: string;
    job_company: string;
    job_location: string;
    image_url: string;
}

const OnlineAssessment = () => { 
    const params = useParams();
    const { id } = params;
    const router = useRouter(); 

    const [onlineAssessment, setOnlineAssessment] = useState<OnlineAssessmentType[]>([]);
    
      const getOnlineAssessment = async () => {
        const tmpOnlineAssessment = await apiService.get(`/api/online_assessments/${id}`);
        setOnlineAssessment(tmpOnlineAssessment.data);
      };
      
      useEffect(() => {
        getOnlineAssessment();
    }, []);
  
    return (
        <div>
            <div>
              <h1>{onlineAssessment.name}</h1>
              <p>{onlineAssessment.topic}</p>
              <p>{onlineAssessment.number_of_questions}</p>
              <p>{onlineAssessment.time}</p>
              <p>{onlineAssessment.required_score_to_pass}</p>

              <div className="space-x-4"> 
                <Button size="invite" onClick={() => router.push(`/pages/job/${onlineAssessment.job}`)}>
                  Start Online Assessment 
                </Button>
                <Button size="invite" variant="outline" onClick={() => router.push(`/pages/job/${onlineAssessment.job}`)}>
                  Job Details 
                </Button>
              </div>
            </div>
        </div>
      );
      
}

export default OnlineAssessment;