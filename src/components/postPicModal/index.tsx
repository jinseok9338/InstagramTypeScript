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
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        visible ? 'visible' : 'invisible'
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
      Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
    --> */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        {/* 
      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-center">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <UploadPictureDropZone />

                <div className="mt-2">
                  <textarea
                    placeholder="what is on your mind?"
                    className=" resize-none text-sm w-full h-full border-green-background border-opacity-50 border-2 focus:outline-none"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => setVisible(false)}
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-red-primary shadow-sm px-4 py-2 bg-red-primary text-base font-medium text-white hover:bg-red-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Post
            </button>
            <button
              onClick={() => setVisible(false)}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-background shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPicModal;
