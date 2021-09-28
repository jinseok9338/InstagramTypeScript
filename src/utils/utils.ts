/* eslint-disable no-useless-escape */

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(phoneNumber);
};

export const isValidPassword = (password: string) => {};

export const isFileImage = (file: File) => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  return file && acceptedImageTypes.includes(file.type);
};

export const validateFile = (file: File) => {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/x-icon',
  ];
  if (validTypes.indexOf(file.type) === -1) {
    return false;
  }
  return true;
};
