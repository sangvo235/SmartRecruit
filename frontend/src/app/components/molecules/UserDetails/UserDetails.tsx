"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
// import { Button } from "../../atoms/Button/Button";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";

interface UserProps {
    userId?: string | null;
}

export interface UserDetailsType {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

const UserDetails: React.FC<UserProps> = ({ userId }) => {

    const id =  userId;

    const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
    
    const getUserDetails = async () => {
        const tmpUserDetails = await apiService.get(`/api/user_details/${id}`);
        setUserDetails(tmpUserDetails);
    };
      
    useEffect(() => {
        getUserDetails();
    }, []);


    return (            
        <div className="flex flex-col items-center">
            {userDetails && ( 
                <>
                    <Avatar className="h-48 w-48 mb-4">
                        <AvatarImage src={userDetails.avatar_url} />
                        <AvatarFallback>{userDetails.name}</AvatarFallback>
                    </Avatar>
                    {/* <div className="text-xl">Change Profile Picture</div> */}

                    <div className="grid w-full max-w-sm gap-2 mt-8">
                        <div className="mb-4">
                            <Label htmlFor="name">Name</Label>
                            <Input type="name" id="name" placeholder="Name" value={userDetails.name} disabled/>
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email" value={userDetails.email} disabled/>
                        </div>

                        {/* <div className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Password" />
                        </div> */}
                    </div>

                    {/* <Button size="lg" className="mt-4">
                        Confirm Change
                    </Button>  */}
                </>
            )}
        </div>
    )
}

export default UserDetails;
