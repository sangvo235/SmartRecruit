"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../atoms/Tabs/Tabs";
import { Card, CardContent, CardFooter } from "../../atoms/InviteCard/InviteCard";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";

export type InviteType = {
  user_id: string;
  assessment_id: string;
  invite_date: string;
  expire_date: string;
  expired: string;
  completed: string;
}

const InvitationTabs = () => {

      const [invites, setInvites] = useState<InviteType[]>([]);
        
      const getUserInvites = async (userId: string) => {
        const response = await apiService.get(`/api/invite/user/${userId}`);
        setInvites(response.data);
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
          {invites.map((invite) => (
            (invite.expired === "false" && invite.completed === "false") ? (
              <Card key={invite.user_id}>
                <CardContent invite={invite} />
                <CardFooter invite={invite}/>
              </Card>
            ) : null
          ))}
        </TabsContent>

        <TabsContent value="completed">
          {invites.map((invite) => (
            invite.completed ? (
              <Card key={invite.user_id}>
                <CardContent invite={invite} />
                <CardFooter invite={invite}/>
              </Card>
            ) : null
          ))}
        </TabsContent>

        <TabsContent value="expired">
        </TabsContent>
      </Tabs>
    );
}

export default InvitationTabs;
