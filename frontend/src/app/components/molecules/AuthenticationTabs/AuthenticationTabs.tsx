"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../atoms/Tabs/Tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader,CardTitle } from "../../atoms/Card/Card";
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button/Button";
import { KeyRound, PencilLine } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const AuthenticationTabs = () => {
    const router = useRouter();
    // const signupModal = useSignupModal();
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    // Submit Function
    const submitSignUp = async () => {
      const formData = {
        email: email,
        password1: password1,
        password2: password2
      };

      const response = await apiService.post("/api/auth/register/", JSON.stringify(formData));

      if (response.access) {
        handleLogin(response.userId, response.access, response.refresh);
        router.push("/");
      } else {
          const tmpErrors: string[] = Object.values(response).map((error: any) => {
              return error;
          })
          setErrors(tmpErrors);
      }
    }

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
                      <div className="grid max-w-sm items-center gap-4">
                          <div className="mb-4">
                              <Label htmlFor="email">Email</Label>
                              <Input type="email" id="email" placeholder="Please enter your email" />
                          </div>

                          <div className="mb-4">
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
                  <CardDescription>Welcome! Please register your details.</CardDescription>
              </CardHeader>
              <CardContent>
                  <form action={submitSignUp}>
                      <div className="grid max-w-sm items-center gap-4">
                          <div className="mb-4">
                              <Label htmlFor="email">Email</Label>
                              <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Please enter your email" />
                          </div>

                          <div className="mb-4">
                              <Label htmlFor="password1">Password</Label>
                              <Input onChange={(e) => setPassword1(e.target.value)} type="password" placeholder="Please enter your password" />
                          </div>

                          <div className="mb-4">
                              <Label htmlFor="password2">Re-enter Password</Label>
                              <Input onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Please re-enter your password" />
                          </div>

                          {errors.map((error, index) => {
                              return (
                                <div key={`error_${index}`} className="text-red-500 text-sm">{error}</div>
                              )
                          })}
                      </div>
                  </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                  <Button onClick={submitSignUp} size="lg">Sign Up</Button>
              </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
}

export default AuthenticationTabs;
