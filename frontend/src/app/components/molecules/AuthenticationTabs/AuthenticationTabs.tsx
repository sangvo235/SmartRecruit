"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../atoms/Tabs/Tabs";
import LoginCard from "../../atoms/LoginCard/LoginCard";
import SignUpCard from "../../atoms/SignUpCard/SignUpCard";

const AuthenticationTabs = () => {

    return (
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginCard />
        </TabsContent>

        <TabsContent value="signup">
          <SignUpCard />
        </TabsContent>
      </Tabs>
    );
}

export default AuthenticationTabs;
