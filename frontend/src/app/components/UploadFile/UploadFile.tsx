"use client"
import { CloudUpload } from 'lucide-react';
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";

function UploadFile() {
  return (
    <div className="flex justify-center items-center my-12">
      <div className="flex justify-center items-center border-dashed border-2 flex-col h-72 w-1/2 rounded-lg border-gray-300 hover:border-gray-500 cursor-pointer">
        <CloudUpload size={48} />
        <Label htmlFor="file" className='pb-4'>Attach your CV</Label>
        <div className="grid w-full max-w-sm">
          <Input id="resume" type="file" />
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
