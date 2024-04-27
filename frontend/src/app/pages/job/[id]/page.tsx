"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { JobType } from "../../../components/molecules/JobList/JobList";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../../components/atoms/Card/Card";
import { ReceiptText, Building2, MapPin, Briefcase, PiggyBank, Hash, Contact, Mail, CalendarDays } from 'lucide-react';
import { Button } from "../../../components/atoms/Button/Button";
import apiService from "@/app/services/apiService";

const JobDetailsPage = () => {
    const params = useParams();
    const { id } = params;
    const [job, setJob] = useState<JobType | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");

    const getJob = async () => {
        const tmpJob = await apiService.get(`/api/jobs/${id}`);
        setJob(tmpJob);
    };
      
    useEffect(() => {
        getJob();
    }, []);

    // Logic for formatting the date
    useEffect(() => {
        if (job?.created_at) {
            const date = new Date(job.created_at);
            const formattedDate = date.toLocaleDateString("en-AU");
            setFormattedDate(formattedDate);
        }
    }, [job?.created_at]);

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl text-center pb-8">{job.title}</div>
            <Card>
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>

                    <CardDescription>
                        <ReceiptText className="w-4 h-4 mr-2" />
                        <span>Contract Type:</span>
                        <span>{job.contract_type}</span>
                    </CardDescription>
                    <CardDescription>
                        <Building2 className="w-4 h-4 mr-2" />
                        <span>Company:</span>
                        <span>{job.company}</span>
                    </CardDescription>
                    <CardDescription>
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Location:</span>
                        <span>{job.location}</span>
                    </CardDescription>
                    <CardDescription>
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>Industry:</span>
                        <span>{job.industry}</span>
                    </CardDescription>
                    <CardDescription>
                        <PiggyBank className="w-4 h-4 mr-2" />
                        <span>Salary:</span>
                        <span>${job.salary}</span>
                    </CardDescription>
                    <CardDescription>
                        <Hash className="w-4 h-4 mr-2" />
                        <span>Reference Id:</span>
                        <span>{job.id}</span>
                    </CardDescription>
                    <CardDescription className="flex items-center">
                        <Contact className="w-4 h-4 mr-2" />
                        <span className="mr-4">Contact Name:</span>
                        <span>TBC</span>
                    </CardDescription>
                    <CardDescription className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="mr-4">Contact Email:</span>
                        <span>TBC</span>
                    </CardDescription>
                    <CardDescription className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        <span className="mr-4">Date Published:</span>
                        <span>{formattedDate}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <h1 className="text-2xl mb-4">Job Description</h1>
                    <p className="ml-6">{job.description}</p>
                </CardContent>
                <CardFooter>
                    <Button size="invite">
                        Apply 
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
};

export default JobDetailsPage;
