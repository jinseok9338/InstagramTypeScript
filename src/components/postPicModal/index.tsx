/* eslint-disable no-lone-blocks */
// Need Container and Post page for the PostPicModal for the page.. I guess?? or just Modal
// Make modal as dynamic container
import { Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import { uploadPictureTotheBucket } from '../../services/photos';
import { PostAPost } from '../../services/users';
import UploadPictureDropZone from './UploadPicture';
import { firebase } from '../../lib/firebase';
import { postType } from '../../services/types';
import ButtonWrapper from '../button';

interface PostPicModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const PostPicModal = ({ visible, setVisible }: PostPicModalProps) => {
  const { displayName, uid } = firebase.auth().currentUser!;

  const [text, setText] = useState('');
  const [files, setFiles] = useState([] as File[]);
  const [loading, setLoading] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

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
              className={`flex relative justify-center px-4 bg-blue-medium p-3 rounded-lg text-white ${
                !loading ? 'hover:bg-blue-hover ' : 'cursor-wait'
              } mr-2`}
              type="submit"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setLoading(true);
                uploadPictureTotheBucket(files[0])
                  .then(async (downloadUrl) => {
                    const postId = uuidv4();
                    const DataPacket: postType = {
                      likes: [],
                      comments: [],
                      picURL: downloadUrl,
                      post: text,
                      posted: new Date(),
                      postId,
                      userId: uid,
                      userName: displayName!,
                    };
                    await PostAPost('posts', DataPacket, uid!);
                    console.log('successfully Updated to the Firestore');
                    setLoading(false);
                    setVisible(false);
                  })
                  .catch((e) => {
                    console.log(e.message);
                    setLoading(false);
                    alert('Something went Wrong Try again');
                  });
              }}
            >
              <p>Post</p>
              <ClipLoader
                color="#7e1f53"
                loading={loading}
                css={override}
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPicModal;
