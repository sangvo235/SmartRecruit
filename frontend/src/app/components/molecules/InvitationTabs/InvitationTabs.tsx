"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../atoms/Tabs/Tabs";
import { Card, CardContent, CardFooter } from "../../atoms/InviteCard/InviteCard";
import { Card2, CardContent2, CardFooter2 } from "../../atoms/InviteCardCompleted/InviteCardCompleted";
import { Card3, CardContent3, CardFooter3 } from "../../atoms/InviteCardExpired/InviteCardExpired";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { OnlineAssessmentType } from "../OnlineAssessment/OnlineAssessment";
import { UserProps } from "../UserDetails/UserDetails";

export type InviteType = {
  job: any;
  id: string;
  user_id: string;
  user_email: string;
  assessment: OnlineAssessmentType;
  invite_date: string;
  expire_date: string;
  score: number;
}

const InvitationTabs: React.FC<UserProps> = ({ userId }) => {
    const [id, setId] = useState<string | null>(null);
    const [activeInvites, setActiveInvites] = useState<InviteType[]>([]);
    const [completedInvites, setCompletedInvites] = useState<InviteType[]>([]);
    const [expiredInvites, setExpiredInvites] = useState<InviteType[]>([]);
  
    useEffect(() => {
      if (userId) {
        setId(userId);
      }
    }, [userId]);
  
    useEffect(() => {
      if (id) {
        const getInvites = async () => {
          try {
            const activeResponse = await apiService.get(`/api/invite/active/user/${id}`);
            const completedResponse = await apiService.get(`/api/invite/completed/user/${id}`);
            const expiredResponse = await apiService.get(`/api/invite/expired/user/${id}`);
  
            setActiveInvites(activeResponse.data);
            setCompletedInvites(completedResponse.data);
            setExpiredInvites(expiredResponse.data);
          } catch (error) {
            console.error("Error fetching invites:", error);
          }
        };
  
        getInvites();
      }
    }, [id]);

    return (
      <Tabs defaultValue="active" className="w-5/6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeInvites.map((invite) => (
            <Card key={invite.user_id}>
              <CardContent invite={invite} />
              <CardFooter invite={invite}/>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed">
          {completedInvites.map((invite) => (
            <Card2 key={invite.user_id}>
              <CardContent2 invite={invite} />
              <CardFooter2 invite={invite}/>
            </Card2>
          ))}
        </TabsContent>

        <TabsContent value="expired">
          {expiredInvites.map((invite) => (
            <Card3 key={invite.user_id}>
              <CardContent3 invite={invite} />
              <CardFooter3 invite={invite}/>
            </Card3>
          ))}
        </TabsContent>
      </Tabs>
    );
}

export default InvitationTabs;
