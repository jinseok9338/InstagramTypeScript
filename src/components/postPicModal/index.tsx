/* eslint-disable no-lone-blocks */
// Need Container and Post page for the PostPicModal for the page.. I guess?? or just Modal
// Make modal as dynamic container
import { Dispatch, SetStateAction, useState } from 'react';
import { uploadPictureTotheBucket } from '../../services/photos';
import { UpdateUserProfile } from '../../services/users';
import UploadPictureDropZone from './UploadPicture';
import {firebase} from "../../lib/firebase"

interface PostPicModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const userId = firebase.auth().currentUser?.uid;

const postPictureWithComment = (text:string, files:any[]) => {
  // Upload Picture and post a text

}

const PostPicModal = ({ visible, setVisible }: PostPicModalProps) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([] as File[]);


  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${
        visible ? 'visible' : 'invisible'
      }`}
    >
      <div className="absolute w-full h-full bg-gray-900 opacity-50" />

      <div className="modal-container bg-white w-full md:max-h-96 h-1/2 md:max-w-2xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
        {/* <!-- Add margin if you want to see some of the overlay behind the modal--> */}
        <div className="modal-content h-full py-4 text-left px-6 flex flex-col justify-between">
          <div
            className="flex justify-between items-center pb-3 ml-auto cursor-pointer"
            role="main"
            onClick={(e) => setVisible(false)}
            onKeyDown={() => null}
          >
            <div className="modal-close z-50">
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>

          {/* <!--Body--> */}
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex flex-col justify-between h-full">
            <UploadPictureDropZone files={files} setFiles={setFiles} />

            <div className="mt-2">
              <textarea
                placeholder="what is on your mind?"
                className=" resize-none text-sm border-green-background border-opacity-50 border-2 focus:outline-none w-full p-1"
                onChange={(e) => {
                  setText(e.target.value);
             
                }}
              />
            </div>
          </div>

          {/* <!--Footer--> */}
          <div className="flex justify-end pt-2">
            <button
              className="px-4 bg-blue-medium p-3 rounded-lg text-white hover:bg-blue-hover mr-2"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                uploadPictureTotheBucket(files[0]).then((url) => {

                  UpdateUserProfile("users",dataPacket,userId!)
                }).catch(e => {
                  console.log(e.message)
                })
                // Add to the firestore
                // should I make every thing into one big data set?? No I shouldn't do that...
                
                
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPicModal;
