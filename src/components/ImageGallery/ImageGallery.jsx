const ImageGallery = ({ photos = [], onClick, children }) => {
  return (
    <>
      <ul
        className="gallery"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',

          gap: 10,
          listStyle: 'none',
          padding: 0,
        }}
      >
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
      <li className="gallery-item">
        <img
          src={src}
          alt={alt}
          onClick={onClick}
          style={{ width: '100%', height: '25vh', objectFit: 'cover' }}
          name={idx}
        />
      </li>
    </>
  );
};

export default ImageGallery;
