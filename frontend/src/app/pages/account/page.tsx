"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../../components/atoms/Avatar/Avatar";
import { Label } from "../../components/atoms/Label/Label";
import { Input } from "../../components/atoms/Input/Input";
import { Button } from "../../components/atoms/Button/Button";

const AccountPage = () => {
    return (
        <main className="max-w-[1500px] m-auto p-6">
            <div className="text-5xl text-center pb-8">Accounts Page</div>
            
            <div className="flex flex-col items-center">
                <Avatar className="h-48 w-48 mb-4">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-xl">Change Profile Picture</div>

                <div className="grid w-full max-w-sm gap-2 mt-8">
                    <div className="mb-4">
                        <Label htmlFor="name">Name</Label>
                        <Input type="name" id="name" placeholder="Name" />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Password" />
                    </div>
                </div>

                <Button size="lg" className="mt-4">
                    Confirm Change
                </Button>

            </div>
        </main>
    )
}

export default AccountPage;
