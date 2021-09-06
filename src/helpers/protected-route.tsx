import { cloneElement, JSXElementConstructor, ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

type ProtectedRouteProp = {
  user: any;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  path: string;
};

export default function ProtectedRoute({
  user,
  children,
  ...rest
}: ProtectedRouteProp) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return cloneElement(children, { user });
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
