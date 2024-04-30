"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../atoms/Tabs/Tabs";
import { Card, CardContent, CardFooter } from "../../atoms/InviteCard/InviteCard";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { OnlineAssessmentType } from "../OnlineAssessment/OnlineAssessment";

export type InviteType = {
  id: string;
  user_id: string;
  user_email: string;
  assessment: OnlineAssessmentType;
  invite_date: string;
  expire_date: string;
  expired: boolean;
  completed: boolean;
}

const InvitationTabs = () => {
  const [activeInvites, setActiveInvites] = useState<InviteType[]>([]);
  const [completedInvites, setCompletedInvites] = useState<InviteType[]>([]);
  const [expiredInvites, setExpiredInvites] = useState<InviteType[]>([]);

  const getUserInvites = async (userId: string) => {
      const activeResponse = await apiService.get(`/api/invite/active/user/${userId}/`);
      const completedResponse = await apiService.get(`/api/invite/completed/user/${userId}/`);
      const expiredResponse = await apiService.get(`/api/invite/expired/user/${userId}/`);
      
      setActiveInvites(activeResponse.data);
      setCompletedInvites(completedResponse.data);
      setExpiredInvites(expiredResponse.data);
  };
  
  useEffect(() => {
    getUserInvites("e5b81074-f591-4e2b-bc7f-6742d0998387");
  }, []);

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
            <Card key={invite.user_id}>
              <CardContent invite={invite} />
              <CardFooter invite={invite}/>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="expired">
          {expiredInvites.map((invite) => (
            <Card key={invite.user_id}>
              <CardContent invite={invite} />
              <CardFooter invite={invite}/>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    );
}

export default InvitationTabs;
