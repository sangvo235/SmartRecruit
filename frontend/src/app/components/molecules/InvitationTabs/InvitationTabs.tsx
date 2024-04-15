"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../atoms/Tabs/Tabs";
import { Button } from "../../atoms/Button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../atoms/InviteCard/InviteCard";
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";

import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import { useEffect, useState } from "react";
import Link from 'next/link';

const InvitationTabs = () => {

    return (
<Tabs defaultValue="account" className="w-5/6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="expired">Expired</TabsTrigger>

      </TabsList>
      <TabsContent value="active">
        <Card>
          <CardHeader />
          <CardContent className="space-y-2" >
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="completed">
      </TabsContent>

      <TabsContent value="expired">
      </TabsContent>
    </Tabs>
    );
}

export default InvitationTabs;
