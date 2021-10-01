/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
// https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/

import {
  faClosedCaptioning,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Preview from './preview';

interface UploadPictureDropZoneProps {
  files: any;
  setFiles: Dispatch<any>;
}

const UploadPictureDropZone = ({
  files,
  setFiles,
}: UploadPictureDropZoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (files.length > 2) {
      // There should be no more than 1 image for now
      setFiles([files[0]]);
    }
  }, [files]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: File) => URL.revokeObjectURL((file as any).preview));
    },
    [files]
  );

  console.log(files);

  const thumbs = files.map((file: File) => (
    <div className="relative" key={file.name}>
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="z-51 cursor-pointer absolute -right-2 -top-2"
        onClick={(e) => {
          setFiles([]);
          e.stopPropagation();
        }}
      />
      <img
        src={(file as any).preview}
        className="w-32 h-32"
        alt="This is ThumbNail"
      />
    </div>
  ));

  return (
    <div className="-translate-y-full text-red-600 text-center bg-white w-full h-full">
      <div
        {...getRootProps({
          className: `dropzone flex items-center  m-0 border-4 border-green-primary border-dashed p-6 h-full ${
            files.length !== 0 ? 'justify-start' : 'justify-center'
          }`,
        })}
      >
        <input {...getInputProps()} />
        {files.length !== 0 ? (
          <Preview thumbs={thumbs} />
        ) : (
          <div className="text-center font-sans text-2xl">
            <p>Drag and Drop Images</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPictureDropZone;
