/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import {  useHistory, useLocation } from 'react-router-dom';
import { updateProfile } from '../../services/profiles';
import * as ROUTES from '../../constants/routes';
import { AddUserToFirestore } from '../../services/signInSignUp';
import { onChangePhoneNumber } from './profileUpdateFunctions';
import PlaceAutoComplete from './placesAutocomplete';

interface stateType {
  username: string;
  fullName: string;
  emailAddress: string;
  password: string;
}

export default function SignUpWithProfileDetail() {
  const { state } = useLocation<stateType>();
  const { username, fullName, emailAddress, password } = state;
  const history = useHistory();

  const [error, setError] = useState('');
  const [residence, setResidence] = useState('');
  const [hobby, setHobby] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aboutYou, setAboutYou] = useState('');

  const handleSignUp = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const userId = await AddUserToFirestore(
        emailAddress,
        password,
        username,
        fullName
      );
      // There can be a case where there is no userId
      updateProfile({ residence, hobby, phoneNumber, aboutYou }, userId!);

      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      let errorMessage = 'Something Went Wrong Try again';
      if (error instanceof Error) {
        errorMessage = error.message;
        setError(errorMessage);
      }
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
      
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
        
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <a href="/">
            <h1 className="flex justify-center w-full">
              <img
                src="/images/logo.png"
                alt="Instagram"
                className="mt-2 w-6/12 mb-4"
              />
            </h1>
          </a>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <PlaceAutoComplete
              residence={residence}
              setResidence={setResidence}
            />
            <input
              aria-label="Enter your hobby"
              type="text"
              placeholder="Hobby"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setHobby(target.value)}
              value={hobby}
            />
            <input
              aria-label="Enter your Phone Number"
              type="text"
              placeholder="Phone Number"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) =>
                onChangePhoneNumber(target.value, setPhoneNumber, setError)
              }
              value={phoneNumber}
            />
            <textarea name="Text1" cols={40} rows={5}
              aria-label="Introduce Yourself"
              placeholder="Introduce yourself"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setAboutYou(target.value)}
              value={aboutYou}
            />
            <button
              type="submit"
              className="bg-blue-medium text-white w-full rounded h-8 font-bold"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
