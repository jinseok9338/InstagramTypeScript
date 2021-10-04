/* eslint-disable no-extra-boolean-cast */
import Skeleton from 'react-loading-skeleton';

interface ImagePropsTypes {
  src: string;
  caption: string;
}

const Image = ({ src, caption }: ImagePropsTypes) => (
  <>
  {
    !!src ?( <img src = { src } alt = { caption } className = "w-96 h-96" />): (
        <Skeleton className="w-96 h-96" />
  )}
 </>
);

export default Image;
