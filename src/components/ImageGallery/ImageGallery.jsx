import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ photos = [], onClick, children }) => {
  return (
    <>
      <ul className={css.gallery}>
        {photos &&
          photos.hits.map((i, idx) => (
            <ImageGalleryItem
              key={i.id}
              src={i.previewURL}
              alt={i.tags}
              idx={idx}
              onClick={onClick}
            />
          ))}
      </ul>
      {children}
    </>
  );
};

const ImageGalleryItem = ({ src, alt, onClick, idx }) => {
  return (
    <>
      <li>
        <img
          className={css.gallery_item}
          src={src}
          alt={alt}
          onClick={onClick}
          name={idx}
        />
      </li>
    </>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.object,
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  idx: PropTypes.number,
};

export default ImageGallery;
