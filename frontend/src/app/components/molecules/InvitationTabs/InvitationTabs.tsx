"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../atoms/Tabs/Tabs";
import { Card, CardContent, CardFooter } from "../../atoms/InviteCard/InviteCard";

const InvitationTabs = () => {

    return (
<Tabs defaultValue="active" className="w-5/6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="expired">Expired</TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <Card>
          <CardContent/>
          <CardFooter />
        </Card>

        <Card>
          <CardContent/>
          <CardFooter />
        </Card>

      </TabsContent>

      <TabsContent value="completed">
        <Card>
          <CardContent/>
          <CardFooter />
        </Card>
      </TabsContent>

      <TabsContent value="expired">
      </TabsContent>
    </Tabs>
    );
}

export default InvitationTabs;
