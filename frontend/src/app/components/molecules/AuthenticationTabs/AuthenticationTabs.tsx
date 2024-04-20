"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../atoms/Tabs/Tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader,CardTitle } from "../../atoms/Card/Card";
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button/Button";
import { KeyRound, PencilLine } from 'lucide-react';

const AuthenticationTabs = () => {

    return (
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="w-[500px]">
              <CardHeader>
                  <CardTitle>
                      Log In
                      <KeyRound className="w-8 h-8 ml-2" />
                  </CardTitle>
                  <CardDescription>Welcome back! Please enter your details.</CardDescription>
              </CardHeader>
              <CardContent>
                  <form>
                      <div className="grid w-full items-center gap-4">
                          <div className="mb-4 w-full max-w-sm">
                              <Label htmlFor="email">Email</Label>
                              <Input type="email" id="email" placeholder="Please enter your email" />
                          </div>

                          <div className="mb-4 w-full max-w-sm">
                              <Label htmlFor="password">Password</Label>
                              <Input type="password" id="password" placeholder="Please enter your password" />
                          </div>
                      </div>
                  </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                  <Button size="lg">Login</Button>
              </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card className="w-[500px]">
              <CardHeader>
                  <CardTitle>
                      Sign Up
                      <PencilLine className="w-8 h-8 ml-2" />
                  </CardTitle>
                  <CardDescription>Welcome back! Please enter your details.</CardDescription>
              </CardHeader>
              <CardContent>
                  <form>
                      <div className="grid w-full items-center gap-4">
                          <div className="mb-4 w-full max-w-sm">
                              <Label htmlFor="email">Email</Label>
                              <Input type="email" id="email" placeholder="Please enter your email" />
                          </div>

                          <div className="mb-4 w-full max-w-sm">
                              <Label htmlFor="password1">Password</Label>
                              <Input type="password1" id="password1" placeholder="Please enter your password" />
                          </div>

                          <div className="mb-4 w-full max-w-sm">
                              <Label htmlFor="password2">Re-enter Password</Label>
                              <Input type="password2" id="password2" placeholder="Please re-enter your password" />
                          </div>
                      </div>
                  </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                  <Button size="lg">Sign Up</Button>
              </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
}

export default AuthenticationTabs;
