"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/Card/Card";
import { Textarea } from "../../atoms/Textarea/Textarea";
import { Button } from "../../atoms/Button/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../atoms/Select/Select";

export interface UserProps {
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

    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (userDetails) {
            setFormValues({
                ...userDetails,
            });
        }
    }, [userDetails]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const [uploadedAvatar, setUploadedAvatar] = useState<File | null>(null);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedAvatar(file);
        }
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (uploadedAvatar) {
            try {
                const formData = new FormData();
                formData.append('avatar', uploadedAvatar);
                const response = await apiService.postAvatarImageUpload(`/api/upload_avatar/${id}/avatar/`, formData);
                if (response.avatar_url) {
                    setUserDetails(prevDetails => ({
                        ...prevDetails as UserDetailsType,
                        avatar_url: response.avatar_url
                    }));
                } else {
                    setErrors(['Avatar upload failed']);
                    return; 
                }
            } catch (error) {
                console.error('Avatar upload failed:', error);
                setErrors(['Avatar upload failed']);
                return; 
            }
        }
    
        const response = await apiService.post(`/api/user_update/${id}/update/`, JSON.stringify(formValues));
        
        if ('detail' in response) {
            setErrors([response.detail]);
        } else {
            setErrors([]);
        }

        window.location.reload();
    };
    
    const handleCancel = () => {
        window.location.reload();
    };    

    return (            
        <div className="flex flex-col items-center">
            {userDetails && ( 
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 max-w-[1000px] gap-4 mt-8">
                        {/* Avatar and Bio */}
                        <div className="col-span-2 flex items-center mb-6 gap-24">
                            <div>
                                {uploadedAvatar ? (
                                    <Avatar className="h-48 w-48">
                                        <AvatarImage src={URL.createObjectURL(uploadedAvatar)} />
                                        <AvatarFallback>{userDetails.name}</AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <Avatar className="h-48 w-48">
                                        <AvatarImage src={formValues.avatar_url} />
                                        <AvatarFallback>{userDetails.name}</AvatarFallback>
                                    </Avatar>
                                )}
                                <Label htmlFor="avatar_url" className="my-4 block text-center">New Avatar Upload</Label>
                                <Input type="file" name="avatar_url" accept="image/*" onChange={handleAvatarChange} />
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
                            <Input type="email" id="email" name="email" value={formValues.email} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="phone">Phone</Label>
                            <Input type="text" id="phone" name="phone" value={formValues.phone} onChange={handleInputChange} />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="location">Location</Label>
                                <Select name="location" value={formValues.location} onValueChange={(value) => setFormValues({ ...formValues, location: value })}>
                                    <SelectTrigger>
                                        <SelectValue>{formValues.location}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACT">ACT</SelectItem>
                                        <SelectItem value="QLD">QLD</SelectItem>
                                        <SelectItem value="NSW">NSW</SelectItem>
                                        <SelectItem value="NT">NT</SelectItem>
                                        <SelectItem value="SA">SA</SelectItem>
                                        <SelectItem value="TAS">TAS</SelectItem>
                                        <SelectItem value="VIC">VIC</SelectItem>
                                    </SelectContent>
                                </Select>
                        </div>
                    </div>
      
                    <div className="flex justify-center space-x-4"> 
                        <Button type="submit" size="invite">Submit</Button>
                        <Button type="button" size="invite" variant="outline" onClick={handleCancel}>Cancel</Button>
                    </div>

                    {errors.length > 0 && (
                        <div className="mt-4 text-red-600">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </form>
            )}
        </div>
    )
}

export default UserDetails;
