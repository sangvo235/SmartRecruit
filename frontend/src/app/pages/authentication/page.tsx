"use client"
import { Label } from "../../components/atoms/Label/Label";
import { Input } from "../../components/atoms/Input/Input";
import { Button } from "../../components/atoms/Button/Button";
import { LogIn } from 'lucide-react';
import Image from "next/image";
import AuthenticationTab from "../../components/molecules/AuthenticationTabs/AuthenticationTabs";

const AuthenticationPage = () => {
    return (
        <main className="max-w-[1250px] m-auto p-6">
            <div className="grid grid-cols-2 gap-6">
                {/* <div className="col-span-1 flex flex-col items-center">
                    <div className="text-5xl text-center pt-8 pb-4 flex items-center">
                        Log In
                        <LogIn className="w-16 h-16 ml-4" />
                    </div>

                    <p>Welcome back! Please enter your details.</p>

                    <div className="mb-4 w-full max-w-sm gap-2 mt-8">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Please enter your email" />
                    </div>

                    <div className="mb-4 w-full max-w-sm gap-2 mt-4">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Please enter your password" />
                    </div>
                    
                    <Button size="lg" className="mt-4">
                    Login
                    </Button>
                </div> */}

                <AuthenticationTab /> 

                <div className="col-span-1 flex justify-center items-center">
                    <Image src="/hot-air-balloon.gif" alt="logo" width={400} height={400} />
                </div>
            </div>
        </main>
    )
}

export default AuthenticationPage;
