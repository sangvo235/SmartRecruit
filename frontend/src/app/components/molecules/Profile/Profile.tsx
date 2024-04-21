"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import { Label } from "../../atoms/Label/Label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../atoms/DropDownMenu/DropDownMenu";
import { useRouter } from "next/navigation";
import { resetAuthCookies } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { UserDetailsType } from "@/app/components/molecules/UserDetails/UserDetails";

interface UserProps {
    userId?: string | null;
}

const Profile: React.FC<UserProps> = ({ userId }) => {
    const id =  userId;
    const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
    
    const getUserDetails = async () => {
        const tmpUserDetails = await apiService.get(`/api/user_details/${id}`);
        setUserDetails(tmpUserDetails);
    };
      
    useEffect(() => {
        getUserDetails();
    }, []);

    const router = useRouter();

    const handleAccount = () => {
        router.push("/pages/account");
    }

    const handleLogout = async () => {
        resetAuthCookies();
        router.push("/pages/authentication");
    }

    const handleSignIn = async () => {
        router.push("/pages/authentication");
    }

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="inline-flex items-center text-center gap-2">
                        {userId ? (
                            <>
                                {userDetails && (
                                    <>
                                        <Label className="text-lg font-semibold">{userDetails.name}</Label>
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={userDetails.avatar_url} />
                                            <AvatarFallback>{userDetails.name}</AvatarFallback>
                                        </Avatar>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </>
                        )}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                {userId ? (
                    <>
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleAccount}>Account Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuLabel>We hope to see you soon!</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignIn}>Sign In</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Profile;
