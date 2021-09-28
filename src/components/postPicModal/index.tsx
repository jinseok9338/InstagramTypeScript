// Need Container and Post page for the PostPicModal for the page.. I guess?? or just Modal
// Make modal as dynamic container
import UploadPicture from './UploadPicture';

const PostPicModal = ({ visible }: { visible: boolean }) => (
  <div
    className={`overflow-auto \
              z-30 \
              object-contain\
              top-20 \
              p-6 \
              border \
              rounded-xl \
              bg-white \
              text-left \
              fixed \
              ${visible ? 'visible' : 'invisible'}`}
  >
    <UploadPicture />{' '}
  </div>
);

export default PostPicModal;
