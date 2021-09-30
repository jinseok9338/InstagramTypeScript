/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
// https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';



const DropZone = () => {
  const [files, setFiles] = useState([] as any);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file:File) => URL.revokeObjectURL((file as any).preview));
  }, [files]);

  const thumbs = files.map((file:File) => (
    <div className="" key={file.name}>
      <div className="">
        <img
          src={(file as any).preview}
          className=""
          alt="This is ThumbNail"
        />
      </div>
    </div>
  ));


  return (
    <div className="-translate-y-full text-red-600 text-center bg-white">
      <div
        {...getRootProps({ className: 'dropzone flex items-center justify-center m-0 h-32 w-800px border-4 border-green-primary border-dashed p-2' })} >
        <input {...getInputProps()} />
        <div className="text-center font-sans text-2xl">
          Drag & Drop Pictures Here
          <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside className="">
          {thumbs}
        </aside>
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
