/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';

interface HeaderProptypes {
  username: string;
}

const Header = ({ username }: HeaderProptypes): JSX.Element => (
  <div className="flex border-b border-gray-primary h-4 p-4 py-8">
    <div className="flex items-center">
      <Link to={`/p/${username}`} className="flex items-center">
        <img
          className="rounded-full h-8 w-8 flex mr-3"
          // This is clearly wrong because the image path is not static
          src='/images/unknown.png'
          onError={(e) => {
            // to solve the not having the type problem
            let { onerror, src } = e.target as HTMLImageElement
            onerror = null;
            src = '/images/unknown.png';
          }}
          alt={`${username}'s profile picture`}
        />
        <p className="font-bold">{username}</p>
      </Link>
    </div>
  </div>
);

export default Header;
