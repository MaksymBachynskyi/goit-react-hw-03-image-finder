import { Searchbar } from './searchbar/searchbar';
import { ImageGallery } from './imageGallery/imagegallery';
import { Component } from 'react';
import { fetchGet } from 'fetch';
import { Button } from './button/button';
import { Modal } from './modal/modal';
import { Loader } from './loader';
import { toast } from 'react-hot-toast';
export class App extends Component {
  state = {
    search: '',
    images: [],
    loader: false,
    error: false,
    page: 1,
    total: 0,
    largeImage: '',
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      try {
        const slicedSearch = this.state.search.slice(
          this.state.search.indexOf('/') + 1
        );
        this.setState({ loader: true });
        const items = await fetchGet(slicedSearch, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...items.hits],
          total: items.total,
        }));
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loader: false });
      }
    }
  }
  onSearch = searchWord => {
    this.setState({
      search: `${Date.now()}/${searchWord}`,
      page: 1,
      loader: false,
      images: [],
      total: 0,
      largeImage: '',
      error: false,
    });
  };
  onLoadMore = async () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };
  onOpenModal = clickedImg => {
    this.setState({
      largeImage: clickedImg,
    });
  };
  onCloseModal = overlay => {
    this.setState({
      largeImage: '',
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSearch} />
        {this.state.loader && <Loader />}
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onOpenModal={this.onOpenModal}
          />
        )}
        {this.state.total / 12 > Math.ceil(this.state.page) && (
          <Button onLoadMore={this.onLoadMore}>Load More</Button>
        )}
        {this.state.largeImage && (
          <Modal
            imgLarge={this.state.largeImage}
            closeModal={this.onCloseModal}
            onCloseModalEscape={this.onCloseModalEscape}
          />
        )}
        {this.state.error && toast.error('Something Went Wrong')}
      </div>
    );
  }
}
