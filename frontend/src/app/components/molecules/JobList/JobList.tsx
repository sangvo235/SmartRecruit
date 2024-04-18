"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "../../atoms/JobCard/JobCard";

export type JobType = {
    id: string;
    title: string;
    // contract_type: string;
    company: string;
    location: string;
    industry: string;
    salary: number;
    description: string;
    info: string;
    image_url: string;
    // recruiter: string;
        // contact_name: string;
        // contact_email: string;
    created_at: string;
}

const JobList = () => {
    const [jobs, setJobs] = useState<JobType[]>([]);
    
    useEffect(() => {
        const getJobs = async () => {
            const url = 'http://localhost:8000/api/jobs/';

            try {
                const response = await fetch(url);
                const data = await response.json();
                setJobs(data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

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