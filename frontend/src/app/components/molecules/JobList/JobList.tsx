"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "../../atoms/JobCard/JobCard";
import apiService from "@/app/services/apiService";

export type JobType = {
    id: string;
    title: string;
    contract_type: string;
    company: string;
    location: string;
    industry: string;
    salary: number;
    description: string;
    intro: string;
    image_url: string;
    recruiter: string;
    recruiter_name: string;
    recruiter_email: string;
    created_at: string;
}

const JobList = () => {
    const [jobs, setJobs] = useState<JobType[]>([]);
    
      const getJobs = async () => {
        const tmpJobs = await apiService.get("/api/jobs/");
        setJobs(tmpJobs.data);
      };
      
      useEffect(() => {
        getJobs();
    }, []);
  
    return (
        <div>
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent job={job} />
              <CardFooter job={job}/>
            </Card>
          ))}
        </div>
      );
      
}

export default JobList;