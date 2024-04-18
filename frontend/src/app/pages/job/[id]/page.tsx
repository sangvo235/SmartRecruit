"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { JobType } from "../../../components/molecules/JobList/JobList";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../../components/atoms/Card/Card";
import { ReceiptText, Building2, MapPin, Briefcase, PiggyBank, Hash, Contact, Mail, CalendarDays } from 'lucide-react';

interface JobCardProps {
    job: JobType;
}

const JobDetailsPage = () => {
    const params = useParams();
    const { id } = params;
    const [job, setJob] = useState<JobCardProps | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!id) return; 
            try {
                const response = await fetch(`http://localhost:8000/api/jobs/${id}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch job details");
                }
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [id]);

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
                        <span>TBC</span>
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
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </main>
    );
};

export default JobDetailsPage;
