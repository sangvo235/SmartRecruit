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
          {/* {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent job={job} />
              <CardFooter job={job}/>
            </Card>
          ))} */}
        </div>
      );
      
}

export default OnlineAssessment;