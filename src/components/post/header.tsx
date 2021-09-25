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
          src={`/images/avatars/${username}.jpg`}
          onError={(e) => {
            // solving by declaring... not very ideal since I touched node file 
            e.target.onerror = null;
            e.target.src = '/images/unknown.png';
          }}
          alt={`${username}'s profile picture`}
        />
        <p className="font-bold">{username}</p>
      </Link>
    </div>
  </div>
);

export default Header;
