"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { JobType } from "../../../components/molecules/JobList/JobList";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../../components/atoms/Card/Card";
import { ReceiptText, Building2, MapPin, Briefcase, PiggyBank, Hash, Contact, Mail, CalendarDays } from 'lucide-react';
import { Button } from "../../../components/atoms/Button/Button";
import apiService from "@/app/services/apiService";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/atoms/Avatar/Avatar";
import { UserProps } from "../UserDetails/UserDetails";

const FullJobDetails: React.FC<JobType & UserProps> = ({ userId }) => {
    const params = useParams();
    const { id } = params;
    
    const [job, setJob] = useState<JobType | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const getJob = async () => {
        const tmpJob = await apiService.get(`/api/jobs/${id}`);
        setJob(tmpJob);
    };
      
    useEffect(() => {
        getJob();
    }, [id]);

    const handleApplyClick = async () => {
        if (job === null) {
            return;
        }

        const response = await apiService.post(`/api/ml/apply/`, JSON.stringify({ user_id: userId, job_id: job.id }));

        if (response.access) {
            const tmpMessage: string[] = Object.values(response).map((message: any) => {
                return message;
            })
            setErrors(tmpMessage);  
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            })
            setErrors(tmpErrors);      
        }   
    };

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
        <>
            <div className="text-5xl font-semibold leading-none tracking-tight text-center pb-8">{job.title}</div>
            <Card>
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>

                    <div className="py-6"> 
                        <Avatar className="w-40 h-40">
                            <AvatarImage src={job.image_url} alt="company_logo" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>
                    
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
                        <span>{job.recruiter_name}</span>
                    </CardDescription>
                    <CardDescription className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="mr-4">Contact Email:</span>
                        <span>{job.recruiter_email}</span>
                    </CardDescription>
                    <CardDescription className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        <span className="mr-4">Date Published:</span>
                        <span>{formattedDate}</span>
                    </CardDescription>
                    <CardDescription>
                    <div className="ml-6 mt-4 text-black">{job.intro}</div>
                    </CardDescription>
                </CardHeader>

                <CardContent >
                    <div className="text-2xl font-semibold flex items-center leading-none tracking-tight mb-4">Job Description</div>
                    <div className="ml-6">{job.description}</div>
                </CardContent>

                <CardFooter>
                    <div>
                        <Button size="invite" onClick={handleApplyClick}>
                            Apply 
                        </Button>
                    
                        {errors.map((error, index) => {
                                return (
                                <div key={`error_${index}`} className="text-red-500 font-semibold text-sm mt-2">{error}</div>
                                )
                            })}
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default FullJobDetails;
