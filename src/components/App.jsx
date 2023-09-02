import { Searchbar } from './searchbar/searchbar';
import { ImageGallery } from './imageGallery/imagegallery';
import { GlobalStyle } from 'globalStyle';
import { Component } from 'react';
import { fetchGet } from 'fetch';
import { Button } from './button/button';
import { Modal } from './modal/modal';
import { Circles } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
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
    if (prevState.search !== this.state.search) {
      try {
        this.setState({ loader: true, page: 1, error: false });
        const slicedSearch = this.state.search.slice(
          this.state.search.indexOf('/') + 1
        );
        const items = await fetchGet(slicedSearch);
        this.setState({
          images: [...items.hits],
          total: items.total,
        });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loader: false });
      }
    }
  }
  onSearch = inputTarget => {
    inputTarget.preventDefault();
    this.setState({
      search: `${Date.now()}/${inputTarget.target.elements.search.value}`,
    });
  };
  onLoadMore = async () => {
    try {
      await this.setState(prev => ({
        loader: true,
        page: prev.page + 1,
        error: false,
      }));
      const slicedSearch = this.state.search.slice(
        this.state.search.indexOf('/') + 1
      );
      const items = await fetchGet(slicedSearch, this.state.page);
      this.setState(p => ({
        images: [...p.images, ...items.hits],
        total: p.total - 12,
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loader: false });
    }
  };
  onOpenModal = clickedImg => {
    this.setState({
      largeImage: clickedImg,
    });
  };
  onCloseModal = overlay => {
    if (overlay.target === overlay.currentTarget) {
      this.setState({
        largeImage: '',
      });
    }
  };
  onCloseModalEscape = () => {
    this.setState({
      largeImage: '',
    });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSearch} />
        {this.state.loader && (
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onOpenModal={this.onOpenModal}
          />
        )}
        {this.state.total > 12 && (
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
        <Toaster position="top-right" />
        <GlobalStyle />
      </div>
    );
  }
}
