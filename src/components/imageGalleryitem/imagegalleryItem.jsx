import { ImageItem, ImageImg } from './imagegalleryItem.styled';
export const ImageGalleryItem = ({
  webformaturl,
  tag,
  onOpenModal,
  largeImage,
}) => {
  return (
    <ImageItem>
      <ImageImg
        src={webformaturl}
        alt={tag}
        onClick={() => {
          onOpenModal(largeImage);
        }}
      />
    </ImageItem>
  );
};
