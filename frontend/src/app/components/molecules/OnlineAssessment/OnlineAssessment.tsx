"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { Button } from "@/app/components/atoms/Button/Button";
import { useRouter } from "next/navigation";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/app/components/atoms/Card/Card";
import { BookType, Building2, MapPin, PersonStanding, Hash, Timer } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/atoms/Avatar/Avatar";

export type OnlineAssessmentType = {
    required_score_to_pass: number;
    id: string;
    name: string;
    topic: string;
    number_of_questions: number;
    time: number;
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

    const [onlineAssessment, setOnlineAssessment] = useState<OnlineAssessmentType | null>(null);
    
    const getOnlineAssessment = async () => {
        const tmpOnlineAssessment = await apiService.get(`/api/online_assessments/${id}`);
        setOnlineAssessment(tmpOnlineAssessment.data);
    };
      
    useEffect(() => {
        getOnlineAssessment();
    }, []);
  
    if (!onlineAssessment) {
        return <div>Loading...</div>;
    }
  
    return (
        <>
          <Card>
            <CardHeader>
                <CardTitle>Online Assessment: {onlineAssessment.name}</CardTitle>

                <div className="py-6"> 
                    <Avatar className="w-40 h-40">
                        <AvatarImage src={onlineAssessment.image_url} alt="company_logo" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
                
                <CardDescription>
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>Company:</span>
                    <span>{onlineAssessment.job_company}</span>
                </CardDescription>
                <CardDescription>
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Location:</span>
                    <span>{onlineAssessment.job_location}</span>
                </CardDescription>
                <CardDescription>
                    <PersonStanding className="w-4 h-4 mr-2" />
                    <span>Job Title:</span>
                    <span>{onlineAssessment.job_title}</span>
                </CardDescription>
                <CardDescription>
                    <BookType className="w-4 h-4 mr-2" />
                    <span>Topic:</span>
                    <span>{onlineAssessment.topic}</span>
                </CardDescription>
                <CardDescription>
                    <Hash className="w-4 h-4 mr-2" />
                    <span>Questions:</span>
                    <span>{onlineAssessment.number_of_questions}</span>
                </CardDescription>
                <CardDescription>
                    <Timer className="w-4 h-4 mr-2" />
                    <span>Time Limit:</span>
                    <span>{onlineAssessment.time} minutes</span>
                </CardDescription>
            </CardHeader>

            <CardFooter className="space-x-4">
              <Button size="invite" onClick={() => router.push(`/pages/online-assessment/${onlineAssessment.id}`)}>
                Start Online Assessment
              </Button>
              <Button size="invite" variant="outline" onClick={() => router.push(`/pages/job/${onlineAssessment.job}`)}>
                Job Details 
              </Button>
            </CardFooter>
        </Card>
      </>
      );
      
}

export default OnlineAssessment;