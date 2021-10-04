/* eslint-disable jsx-a11y/img-redundant-alt */
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { uploadPictureTotheBucket } from '../../services/photos';
import { profileType } from '../../services/types';
import { firebase } from '../../lib/firebase';
import ProfileImageUploadModal from './profileImageUpload';

const ProfileImage = ({ profile }: { profile: profileType }) => {
  const [visible, setVisible] = useState(false)
  console.log(profile)
    
  // I need to make modal for the image upload maybe I can reuse the modal I made before and modify it.... Hmm..
  // Very poor choice for the resuability
  return (
    <>
      {profile.profilePic ? (
        <div className="h-40 w-40 flex">
          <img
            className="rounded-full"
            src={profile.profilePic}
            alt={`${profile.fullName} profile picture`}
          />
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="right-0 left-auto cursor-pointer"
            onClick={() => setVisible((prev)=>!prev)}
          />
          <ProfileImageUploadModal visible={visible} setVisible={ setVisible}/>
        </div>
      ) : (
        <div className="h-40 w-40 flex">
          <img
            className="rounded-full"
            src="/images/unknown.png"
            alt={`${profile.fullName}'s profile picture`}
          />
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="right-0 left-auto cursor-pointer"
              onClick={() => setVisible((prev) => !prev)}
          />
            <ProfileImageUploadModal visible={visible} setVisible={setVisible} />
        </div>
      )}
    </>
  );
};

export default ProfileImage;
