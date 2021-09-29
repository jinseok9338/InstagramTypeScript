/* eslint-disable arrow-body-style */
const PicturePreview = (source: string) => {
  return (
    <div className="container">
      <img src={source} alt="This is Preview" />
    </div>
  );
};

export default PicturePreview;
