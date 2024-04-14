import { FileInput } from '@mantine/core';
import { CloudUpload } from 'lucide-react';

function UploadFile() {
  return (
    <div className="flex justify-center items-center my-12">
      <div className="flex justify-center items-center border-dashed border-2 flex-col h-72 w-1/2 rounded-lg border-gray-300 hover:border-gray-500 cursor-pointer">
        <CloudUpload size={48} />
        <FileInput
        className='text-xl text-center'
          label="Attach your CV"
          placeholder="DOC & PDF Accepted, up to 50MB"
          rightSectionPointerEvents="none"
          mt="md"
        />
      </div>
    </div>
  );
}

export default UploadFile;
