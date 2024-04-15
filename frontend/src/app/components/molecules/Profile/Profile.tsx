import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import { Label } from "../../atoms/Label/Label";
import { useEffect, useState } from "react";
import { AVATAR_LIST } from '../../../../../constants';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../atoms/DropDownMenu/DropDownMenu";
import Link from 'next/link';

const Profile = () => {
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
                <Link href="/pages/account"><DropdownMenuItem>Account Details</DropdownMenuItem></Link>
                <DropdownMenuItem>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
 
    );
}

export default Profile;
