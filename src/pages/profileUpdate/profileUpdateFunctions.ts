import { validatePhoneNumber } from '../../utils/utils';

export const onChangePhoneNumber = (
  phoneNumber: string,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const isPhoneNumber = validatePhoneNumber(phoneNumber);
  if (isPhoneNumber) {
    setPhoneNumber(phoneNumber);
    setError('');
  } else {
    setPhoneNumber(phoneNumber);
    setError("It's not a phone Number");
  }
};
