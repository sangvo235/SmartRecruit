"use client"

import { useEffect, useState } from "react"
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter } from "../../atoms/JobCard/JobCard";

export type JobType = {
    id: string;
    title: string;
    location: string;
    salary: number;
    industry: string;
    company: string;
    image_url: string;
    // recruiter: string;
    description: string;
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

        <Card>
          <CardContent/>
          <CardFooter />
        </Card>






            <h1>Info from db will be displayed below, component still WIP:</h1>
            {jobs.map((job) => (
                <div key={job.id}>
                    <h2>{job.title}</h2>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                    <p>{job.industry}</p>
                    <p>{job.company}</p>

                    <Image src={job.image_url} alt="logo" width={200} height={200} />

                    <p>{job.description}</p>

                    {/* <p>{job.recruiter}</p> */}
                </div>
            ))}
        </div>
    )
}

export default JobList;