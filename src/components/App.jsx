import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './EverythingElse/Loader';
import Button from './EverythingElse/Button';
import { Component } from 'react';
import axios from 'axios';
// import Modal from './Modal/Modal';
import Modal from 'react-modal';

export class App extends Component {
  state = {
    photos: null,
    page: 1,
    queue: '',
    loading: false,
    idx: 0,
    modalShow: false,
  };

  #link = 'https://pixabay.com/api/?key=35247851-438fd9775b2d9df55636ff8fe';

  onSubmit = e => {
    e.preventDefault();

    this.setState({ page: 1, photos: null, loading: true });
  };

  getPhotos() {
    axios
      .get(
        this.#link +
          '&q=' +
          this.state.queue.trim() +
          '&page=' +
          this.state.page
      )
      .then(res => res.data)
      .then(d => this.setState({ photos: d }))
      .finally(this.setState({ loading: false }));
  }

  onChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    // console.log(this.state.queue);
  };

  onClick = () => {
    if (!this.state.photos) return;

    this.setState({ page: this.state.page + 1 });
  };

  onImageClick = e => {
    this.setState({ idx: e.currentTarget.name });
    // console.log(e.currentTarget.name);
    this.openeModal();
  };

  openeModal = () => {
    this.setState({ modalShow: true });
  };

  closeModal = () => {
    this.setState({ modalShow: false });
  };

  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      if (this.state.loading) {
        this.getPhotos();
      } else if (prevState.page !== this.state.page) this.getPhotos();
    }, 100);
  }

  getBigImg() {
    if (!this.state.photos) return;
    const img = this.state.photos.hits[this.state.idx];
    return <img src={img.largeImageURL} alt={img.tags} />;
  }

  render() {
    return (
      <>
        <div style={{ margin: '0 40px' }}>
          <Searchbar
            onChange={this.onChange}
            queue={this.state.queue}
            onSubmit={this.onSubmit}
          />
          <ImageGallery photos={this.state.photos} onClick={this.onImageClick}>
            <Button text="Next Page" onClick={this.onClick} />
          </ImageGallery>
        </div>
        <Modal isOpen={this.state.loading}>
          <Loader />
        </Modal>
        <Modal isOpen={this.state.modalShow} onRequestClose={this.closeModal}>
          {this.getBigImg()}
        </Modal>
      </>
    );
  }
}
