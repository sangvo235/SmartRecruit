"use client"
import { useEffect, useState } from "react"
import apiService from "@/app/services/apiService";

export type OnlineAssessmentType = {
    id: string;
    name: string;
    topic: string;
    number_of_questions: number;
    time: number;
    required_score_to_pass: number;
}

const OnlineAssessment = () => {
    const [onlineAssessment, setOnlineAssessment] = useState<OnlineAssessmentType[]>([]);
    
      const getOnlineAssessment = async () => {
        const tmpOnlineAssessment = await apiService.get("/api/online_assessments/");
        setOnlineAssessment(tmpOnlineAssessment.data);
      };
      
      useEffect(() => {
        getOnlineAssessment();
    }, []);


  //   useEffect(() => {
  //     const getJobs = async () => {
  //         try {
  //             const tmpJobs = await apiService.get("/api/jobs/");
  //             setJobs(tmpJobs.data);
  //         } catch (error) {
  //             console.error("Error fetching jobs:", error);
  //         }
  //     };
  //     getJobs();
  // }, []);
  
    return (
        <div>
          {onlineAssessment.map((onlineAssessment) => (
            <div key={onlineAssessment.id}>
              <h1>{onlineAssessment.name}</h1>
              <p>{onlineAssessment.topic}</p>
              <p>{onlineAssessment.number_of_questions}</p>
              <p>{onlineAssessment.time}</p>
              <p>{onlineAssessment.required_score_to_pass}</p>
            </div>
          ))}
        </div>
      );
      
}

export default OnlineAssessment;