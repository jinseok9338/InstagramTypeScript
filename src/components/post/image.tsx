interface ImagePropsTypes {
  src: string;
  caption: string;
}

const Image = ({ src, caption }: ImagePropsTypes) => (
  <img src={src} alt={caption} />
);

export default Image;
