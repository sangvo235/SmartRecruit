import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar";
import { Label } from "../Label/Label";
import { useEffect, useState } from "react";
import { AVATAR_LIST } from '../../../../constants';

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
            <div className="inline-flex items-center text-center gap-2">
                <Label className="text-lg font-semibold">{AVATAR_LIST[currentImageIndex].name}</Label>
                <Avatar>
                    <AvatarImage src={AVATAR_LIST[currentImageIndex].src} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
    );
}

export default Profile;
