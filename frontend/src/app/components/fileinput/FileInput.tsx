import { FileInput } from '@mantine/core';

function Upload() {
  return (
    <FileInput accept="image/png,image/jpeg" label="Upload files" placeholder="Upload files" />
  );
}

export default Upload;