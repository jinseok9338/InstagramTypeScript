/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
// https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/

import { useState } from 'react';
import { validateFile } from '../../../utils/utils';

const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

const DropZone = () => {
  const [selectedFiles, setSelectedFiles] = useState([] as File[]);
  const [errorMessage, setErrorMessage] = useState('');

  interface FileType extends File {
    invalid: boolean;
  }

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i += 1) {
      if (validateFile(files[i])) {
        // add to an array so we can display the name of file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        // add a new property called invalid Fix it because adding custom property in File is crucial
        const filesIndex = files[i] as FileType;
        filesIndex.invalid = true;
        // add to the same array so we can display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // set error message
        setErrorMessage('File type not permitted');
      }
    }
  };

  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files.length) {
      handleFiles(files);
    }
  };

  return (
    <div className="-translate-y-full text-red-600 text-center bg-white">
      <div
        className="flex items-center justify-center m-0 h-32 w-800px border-4 border-green-primary border-dashed p-2"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <div className="text-center font-sans text-2xl">
          Drag & Drop Pictures Here
        </div>
      </div>
    </div>
  );
};

const UploadPictureDropZone = () => {
  return (
    <div className="content">
      <DropZone />
    </div>
  );
};

export default UploadPictureDropZone;
