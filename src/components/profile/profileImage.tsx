/* eslint-disable jsx-a11y/img-redundant-alt */
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { uploadPictureTotheBucket } from '../../services/photos';
import { profileType } from '../../services/types';
import { firebase } from '../../lib/firebase';

const ProfileImage = ({ profile }: { profile: profileType }) => {
  const [file, setFile] = useState({} as File);
  const inputFile = useRef(null);

  const uploadProfilePic = async (file: File, profile: profileType) => {
    const downloadURL = await uploadPictureTotheBucket(file);
    await firebase
      .firestore()
      .collection('users')
      .doc(profile.userId)
      .update({ profilePic: downloadURL });
      console.log('successfully updated the user ProfilePic');
  };
    
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
            onClick={() => (inputFile?.current! as any).click()}
          />
          <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: 'none' }}
            onChange={async(e) => {
              setFile((e.target as any).files[0]);
                
            }}
          />
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
            onClick={() => (inputFile?.current! as any).click()}
          />
          <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: 'none' }}
                          onChange={async (e) => {
                              setFile((e.target as any).files[0]);
                              while (Object.entries(file).length === 0) {
                                  console.log("Not happening")
                                  // No matter what I do it doesn't change the state.
                              }
                          }}
          />
        </div>
      )}
    </>
  );
};

export default ProfileImage;
