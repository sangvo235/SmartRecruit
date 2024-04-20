"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import { Label } from "../../atoms/Label/Label";
import React, { useEffect, useState } from "react";
import { AVATAR_LIST } from '../../../../../constants';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../atoms/DropDownMenu/DropDownMenu";
import { useRouter } from "next/navigation";
import { resetAuthCookies } from "@/app/lib/actions";

const Profile = () => {

    const router = useRouter();

    const handleAccount = () => {
        router.push("/pages/account");
    }

    const handleLogout = () => {
        resetAuthCookies();
        router.push("/pages/authentication");
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const cycleAvatarImages = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % AVATAR_LIST.length);
    };

    useEffect(() => {
        const intervalId = setInterval(cycleAvatarImages, 15000);
        return () => clearInterval(intervalId);
    }, []);

    return (
       
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="inline-flex items-center text-center gap-2">
                    <Label className="text-lg font-semibold">{AVATAR_LIST[currentImageIndex].name}</Label>
                    <Avatar>
                        <AvatarImage src={AVATAR_LIST[currentImageIndex].src} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAccount}>Account Details</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
 
    );
}

export default Profile;
