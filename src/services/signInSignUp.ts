import { useHistory } from 'react-router-dom';
import { firebase, Providers } from '../lib/firebase';


export const SignInWithGoogle = async () => {
    const history = useHistory();
    const { user } = await firebase.auth().signInWithPopup(Providers.google);
    const credential = await user?.getIdToken();

    if (credential) {
        try {
            history.push('/');
        } catch (e) {
            let errorMessage = 'Failed to log in';
            if (e instanceof Error) {
                errorMessage = e.message;
                alert('Something Went Wrong Try again'); // Didin't I fix it??
            }
        }
    }
};