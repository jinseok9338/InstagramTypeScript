/* eslint-disable no-lone-blocks */
// Need Container and Post page for the PostPicModal for the page.. I guess?? or just Modal
// Make modal as dynamic container
import { Dispatch, SetStateAction, useState } from 'react';
import UploadPictureDropZone from './UploadPicture';

interface PostPicModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const PostPicModal = ({ visible, setVisible }: PostPicModalProps) => {
  const [text, setText] = useState('');
  return (
    <div className="modal opacity-100 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-50" />

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

        {/* <!-- Add margin if you want to see some of the overlay behind the modal--> */}
        <div className="modal-content py-4 text-left px-6">
          {/* <!--Title--> */}
          <div className="flex justify-between items-center pb-3 ml-auto">
            <div className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>

          {/* <!--Body--> */}
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <UploadPictureDropZone />

            <div className="mt-2">
              <textarea
                placeholder="what is on your mind?"
                className=" resize-none text-sm border-green-background border-opacity-50 border-2 focus:outline-none"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
          </div>
 
          {/* <!--Footer--> */}
          <div className="flex justify-end pt-2">
            <button className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" type="button">Action</button>
            <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" type="button">Close</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostPicModal;

{/*  */}