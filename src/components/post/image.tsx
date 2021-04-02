import PropTypes from 'prop-types';
import React from 'react';

interface PropsTypes {
  src: string;
  caption: string;
}

const Image: React.FC<PropsTypes> = ({ src, caption }) => {
  return <img src={src} alt={caption} />;
};

export default Image;
