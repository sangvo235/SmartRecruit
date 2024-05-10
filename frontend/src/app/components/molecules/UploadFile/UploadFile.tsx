"use client";
import { CloudUpload } from 'lucide-react';
import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { UserProps } from "../UserDetails/UserDetails";
import { File } from 'lucide-react';

export interface UserFileType {
  id: string;
  email: string;
  resume_url: string;
}

const UploadFile: React.FC<UserProps> = ({ userId }) => {
  const id = userId;
  const [formValues, setFormValues] = useState<UserFileType>({
    id: "",
    email: "",
    resume_url: "",
  });

  const getUploadedResume = async () => {
    const tmpUploadedResume = await apiService.get(`/api/user_details/${id}/resume/`);
    if (tmpUploadedResume) {
      setFormValues(tmpUploadedResume);
    }
  };
    
  useEffect(() => {
    getUploadedResume();
  }, []);

  const handleResumeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('resume', file);
        await apiService.postFormData(`/api/user_details/${id}/upload/resume/`, formData);
        getUploadedResume(); 
      } catch (error) {
        console.error('Resume upload failed:', error);
      }
    }
  };  

  const getFileNameFromUrl = (url: string) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  };

  return (
    <div>
      <div className="flex justify-center items-center my-12">
        <div className="flex justify-center items-center border-dashed border-2 flex-col h-72 w-1/2 rounded-lg border-gray-300 hover:border-gray-500 cursor-pointer">
          <CloudUpload size={48} />
          <Label htmlFor="resume" className='pb-4'>Attach your CV</Label>
          <div className="grid w-full max-w-sm">
            <Input id="resume" type="file" onChange={handleResumeChange} />
          </div>
          {formValues.resume_url && (
            <div className="flex flex-inline justify-center mt-8 font-semibold text-smartorange">
              <File className='mr-2'/> 
              Current Resume: {getFileNameFromUrl(formValues.resume_url)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadFile;