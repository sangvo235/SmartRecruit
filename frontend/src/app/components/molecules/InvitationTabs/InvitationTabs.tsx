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
  // assessment: OnlineAssessmentType;
  invite_date: string;
  expire_date: string;
  expired: boolean;
  completed: boolean;
}

const InvitationTabs = () => {
  const [activeInvites, setActiveInvites] = useState<InviteType[]>([]);
  const [completedInvites, setCompletedInvites] = useState<InviteType[]>([]);
  const [expiredInvites, setExpiredInvites] = useState<InviteType[]>([]);

  const getUserInvites = async () => {
    const tmpInvites = await apiService.get(`/api/invite/`);
    setActiveInvites(tmpInvites.data.active);
    setCompletedInvites(tmpInvites.data.completed);
    setExpiredInvites(tmpInvites.data.expired);
  };
  
  useEffect(() => {
    getUserInvites();
  }, []);


    return (
      <Tabs defaultValue="active" className="w-5/6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
        <div>
          {activeInvites.map((invite) => (
            <Card key={invite.id}>
              <CardContent invite={invite} />
              <CardFooter invite={invite} />
            </Card>
          ))}
        </div>
        </TabsContent>

        <TabsContent value="completed">
        <div>
        {completedInvites.map((invite) => (
            <Card key={invite.id}>
              <CardContent invite={invite} />
              <CardFooter invite={invite} />
            </Card>
          ))}
        </div>
        </TabsContent>

        <TabsContent value="expired">
        </TabsContent>
      </Tabs>
    );
}

export default InvitationTabs;
