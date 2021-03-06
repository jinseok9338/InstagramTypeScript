import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
//  import { seedDatabase } from './seed';
//  import { firebase } from './lib/firebase';
import ProtectedRoute from './helpers/protected-route';
import 'font-awesome/css/font-awesome.min.css';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));
const ProfileUpdate = lazy(() => import('./pages/profileUpdate'));

export default function App() {
  const user = useAuthListener();

  // useEffect(() => {
  //    seedDatabase(firebase);
  //  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.PROFILE_UPDATE} component={ProfileUpdate} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD}>
              <Dashboard user={user} />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
