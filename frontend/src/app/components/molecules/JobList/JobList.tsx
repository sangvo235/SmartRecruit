'use client'

import { useEffect, useState } from "react"

export type JobType = {
    id: string;
    title: string;
    location: string;
    salary: number;
    industry: string;
    company: string;
    image: string;
    recruiter: string;
    description: string;
}

const JobList = () => {
    const [jobs, setJobs] = useState<JobType[]>([]);
    const getJobs = async () => {
        const url = 'http://localhost:8000/api/jobs/'

        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((json) => {
                console.log('json', json);

                setJobs(json.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };

    useEffect(() => {
        getJobs();
    }, []);

    return (
        <div>
            <h1>Info from db will be displayed below, component still WIP:</h1>
            {jobs.map((job) => (
                <div key={job.id}>
                    <h2>{job.title}</h2>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                    <p>{job.industry}</p>
                    <p>{job.company}</p>
                    <img src={job.image} alt="job image" />
                    <p>{job.recruiter}</p>
                    <p>{job.description}</p>
                </div>
            ))}
        </div>
    )
}

export default JobList;