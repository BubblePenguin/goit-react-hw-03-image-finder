import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './EverythingElse/Loader';
import Button from './EverythingElse/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// export class App extends Component {
//   state = {
//     photos: null,
//     page: 1,
//     queue: '',
//     loading: false,
//     idx: 0,
//     modalShow: false,
//   };

//   #link = 'https://pixabay.com/api/?key=35247851-438fd9775b2d9df55636ff8fe';

//   onSubmit = e => {
//     e.preventDefault();

//     this.setState({ page: 1, photos: null, loading: true });
//   };

//   getPhotos() {
//     axios
//       .get(
//         this.#link +
//           '&q=' +
//           this.state.queue.trim() +
//           '&page=' +
//           this.state.page
//       )
//       .then(res => res.data)
//       .then(d => this.setState({ photos: d }))
//       .finally(this.setState({ loading: false }));
//   }

//   onChange = e => {
//     this.setState({ [e.currentTarget.name]: e.currentTarget.value });
//   };

//   onClick = () => {
//     if (!this.state.photos) return;

//     this.setState({ page: this.state.page + 1 });
//   };

//   onImageClick = e => {
//     this.setState({ idx: e.currentTarget.name });
//     this.openeModal();
//   };

//   openeModal = () => {
//     this.setState({ modalShow: true });
//   };

//   closeModal = () => {
//     this.setState({ modalShow: false });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     setTimeout(() => {
//       if (this.state.loading) {
//         this.getPhotos();
//       } else if (prevState.page !== this.state.page) this.getPhotos();
//     }, 100);
//   }

//   getBigImg() {
//     if (!this.state.photos) return;
//     const img = this.state.photos.hits[this.state.idx];
//     return (
//       <img
//         src={img.largeImageURL}
//         alt={img.tags}
//         style={{
//           width: '100%',
//           height: '100%',
//           objectFit: 'contain',
//           overflow: 'hidden',
//         }}
//       />
//     );
//   }

//   render() {
//     const { queue, loading, photos, modalShow } = this.state;
//     return (
//       <>
//         <div>
//           <Searchbar
//             onChange={this.onChange}
//             queue={queue}
//             onSubmit={this.onSubmit}
//           />
//           <ImageGallery photos={photos} onClick={this.onImageClick}>
//             <Button text="Next Page" onClick={this.onClick} visible={photos} />
//           </ImageGallery>
//         </div>
//         {Modal.setAppElement('#root')}
//         <Modal isOpen={loading} style={{ overlay: { zIndex: 1200 } }}>
//           <Loader />
//         </Modal>
//         <Modal
//           isOpen={modalShow}
//           onRequestClose={this.closeModal}
//           style={{ overlay: { zIndex: 1200 } }}
//         >
//           {this.getBigImg()}
//         </Modal>
//       </>
//     );
//   }
// }

const link = 'https://pixabay.com/api/?key=35247851-438fd9775b2d9df55636ff8fe';

export default function App() {
  const [photos, setPhotos] = useState(null);
  const [page, setPage] = useState(1);
  const [queue, setQueue] = useState('');
  const [loading, setLoading] = useState(false);
  const [idx, setIdx] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    setPage(1);
    setPhotos(null);
    setLoading(true);
  };

  const getPhotos = () => {
    axios
      .get(link + '&q=' + queue.trim() + '&page=' + page)
      .then(res => res.data)
      .then(d => setPhotos(d))
      .finally(setLoading(false));
  };

  const onChange = e => {
    switch (e.currentTarget.name) {
      case 'queue':
        setQueue(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const onClick = () => {
    if (!photos) return;

    setPage(page + 1);
    setLoading(true);
  };

  const onImageClick = e => {
    setIdx(e.currentTarget.name);
    setModalShow(true);
  };

  const getBigImg = () => {
    if (!photos) return;
    const img = photos.hits[idx];
    return (
      <img
        src={img.largeImageURL}
        alt={img.tags}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          overflow: 'hidden',
        }}
      />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (loading) getPhotos();
    }, 100);
  }, [page, loading]);

  return (
    <>
      <div>
        <Searchbar onChange={onChange} queue={queue} onSubmit={onSubmit} />
        <ImageGallery photos={photos} onClick={onImageClick}>
          <Button text="Next Page" onClick={onClick} visible={photos} />
        </ImageGallery>
      </div>
      {Modal.setAppElement('#root')}
      <Modal isOpen={loading} style={{ overlay: { zIndex: 1200 } }}>
        <Loader />
      </Modal>
      <Modal
        isOpen={modalShow}
        onRequestClose={() => setModalShow(false)}
        style={{ overlay: { zIndex: 1200 } }}
      >
        {getBigImg()}
      </Modal>
    </>
  );
}
