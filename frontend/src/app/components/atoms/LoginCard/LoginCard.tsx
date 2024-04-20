"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader,CardTitle } from "../../atoms/Card/Card";
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button/Button";
import { KeyRound } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const LoginCard = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    // Login Function
    const submitLogin = async () => {
      const formData = {
        email: email,
        password: password,
      };

      const response = await apiService.post("/api/auth/login/", JSON.stringify(formData));

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
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>
                    Log In
                    <KeyRound className="w-8 h-8 ml-2" />
                </CardTitle>
                <CardDescription>Welcome back! Please enter your details.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={submitLogin}>
                    <div className="grid max-w-sm items-center gap-4">
                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Please enter your email" />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Please enter your password" />
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
                <Button onClick={submitLogin} size="lg">Login</Button>
            </CardFooter>
        </Card>
    );
}

export default LoginCard;
