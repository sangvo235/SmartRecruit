"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/Card/Card";
import { Textarea } from "../../atoms/Textarea/Textarea";
import { Button } from "../../atoms/Button/Button";
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

    const [formValues, setFormValues] = useState<UserDetailsType>({
        id: "",
        name: "",
        email: "",
        avatar_url: "",
        bio: "",
        phone: "",
        location: "",
    });

    useEffect(() => {
        if (userDetails) {
            setFormValues({
                ...userDetails,
            });
        }
    }, [userDetails]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormValues({
                    ...formValues,
                    avatar_url: reader.result as string,
                });
            };
        }
    };    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // http://localhost:8000/api/user_details/d4547052-8218-438a-b393-3ad725d1c594/update/
        const response = await apiService.post(`/api/user_update/${id}/update/`, JSON.stringify(formValues));

        if (response.access) {
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            })
            // setErrors(tmpErrors);
        }
    };

    // const [errors, setErrors] = useState<string[]>([]);

    return (            
        <div className="flex flex-col items-center">
            {userDetails && ( 
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 max-w-[1000px] gap-4 mt-8">
                        {/* Avatar and Bio */}
                        <div className="col-span-2 flex items-center mb-6 gap-24">
                            <div>
                                <Avatar className="h-48 w-48">
                                    <AvatarImage src={formValues.avatar_url} />
                                    <AvatarFallback>{userDetails.name}</AvatarFallback>
                                </Avatar>
                                <Label htmlFor="avatar" className="my-4 block text-center">New Avatar Upload</Label>
                                <Input id="avatar" type="file" onChange={handleAvatarChange} />
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{userDetails.name}'s Bio</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea className="min-h-32" id="bio" name="bio" value={formValues.bio} onChange={handleInputChange} />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" value={userDetails.email} />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="phone">Phone</Label>
                            <Input type="text" id="phone" name="phone" value={formValues.phone} onChange={handleInputChange} />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="location">Location</Label>
                            <Input type="text" id="location" name="location" value={formValues.location} onChange={handleInputChange} />
                        </div>
                    </div>
      
                    <div className="flex justify-center space-x-4"> 
                        <Button type="submit" size="invite" >Submit</Button>
                        <Button type="reset" size="invite" variant="outline">Cancel</Button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default UserDetails;
