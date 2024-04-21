"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/Card/Card";
interface UserProps {
    userId?: string | null;
}

export interface UserDetailsType {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    bio: string;
    phone: string;
    location: string;
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
                <div className="grid grid-cols-2 max-w-[1000px] gap-4 mt-8">
                    {/* Avatar and Bio */}
                    <div className="col-span-2 flex items-center mb-6 gap-24">
                        <Avatar className="h-48 w-48">
                            <AvatarImage src={userDetails.avatar_url} />
                            <AvatarFallback>{userDetails.name}</AvatarFallback>
                        </Avatar>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>{userDetails.name}'s Bio</CardTitle>
                            </CardHeader>
                            <CardContent>
                            {userDetails.bio}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="name">Name</Label>
                        <Input type="name" id="name" value={userDetails.name} disabled/>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" value={userDetails.email} disabled/>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="phone">Phone</Label>
                        <Input type="phone" id="phone" value={userDetails.phone} disabled/>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="location">Location</Label>
                        <Input type="location" id="location" value={userDetails.location} disabled/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserDetails;
