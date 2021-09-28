/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
// https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/

import React, { useState } from 'react';
import { validateFile } from '../../utils/utils';

const dragOver = (e) => {
  e.preventDefault();
};

const dragEnter = (e) => {
  e.preventDefault();
};

const dragLeave = (e) => {
  e.preventDefault();
};

const handleFiles = (files: string | any[]) => {
  for (let i = 0; i < files.length; i += 1) {
    if (validateFile(files[i])) {
      // add to an array so we can display the name of file
      
    } else {
      // add a new property called invalid
      files\[i\]['invalid'] = true;
      // add to the same array so we can display the name of the file
      // set error message
    }
  }
}

const fileDrop = (e: Event) => {
  e.preventDefault();
  const { files } = e.dataTransfer;
  if (files.length) {
    handleFiles(files);
  }
};

const DropZone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="-translate-y-full text-red-600 text-center">
      <div
        className="flex items-center justify-center m-0 h-200px w-800px border-4 border-green-600 border-dashed"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <div className="text-center font-sans text-2xl">
          <div className="w-50px h-50px bg-auto bg-uploadImage text-center -mt-0 pt-30px"></div>
          Drag & Drop files here or click to upload
        </div>
      </div>
    </div>
  );
}

const UploadPictureDropZone = () => {
  return (
    <div className="content">
      <DropZone />
    </div>
  );
};

export default UploadPictureDropZone;
